import { randomBytes } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { userInfo } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { configuracion, inicializar, parsearEnv } from '../lib/db-init.mjs';
import { migrar } from '../lib/db-migrate.mjs';
import { resetear } from '../lib/db-reset.mjs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const carpetaDb = join(raiz, 'infra', 'db');
const carpetaMigraciones = join(carpetaDb, 'migrations');

// ---------------------------------------------------------------------------
// Archivos
// ---------------------------------------------------------------------------

describe('archivos de migracion', () => {
  it('existe el diario de drizzle', () => {
    expect(existsSync(join(carpetaMigraciones, 'meta', '_journal.json'))).toBe(true);
  });

  it('la migracion base (0000) revoca los privilegios de PUBLIC sobre el esquema public', () => {
    const archivos = readdirSync(carpetaMigraciones).filter((f) => /^0000_.*\.sql$/.test(f));
    expect(archivos).toHaveLength(1);
    const sql = readFileSync(join(carpetaMigraciones, archivos[0]), 'utf8');
    expect(sql).toMatch(/REVOKE\s+ALL\s+ON\s+SCHEMA\s+public\s+FROM\s+PUBLIC/i);
  });

  it('existen la configuracion de drizzle y el esquema', () => {
    expect(existsSync(join(carpetaDb, 'drizzle.config.ts'))).toBe(true);
    expect(existsSync(join(carpetaDb, 'schema.ts'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Integracion (Postgres local)
// ---------------------------------------------------------------------------

const HOST = '127.0.0.1';
const PUERTO = 5432;

const clienteAdmin = (base = 'postgres') =>
  new pg.Client({ user: userInfo().username, host: HOST, port: PUERTO, database: base });

const hayPostgres = await (async () => {
  const c = clienteAdmin();
  c.on('error', () => {});
  try {
    await c.connect();
    const { rows } = await c.query('SELECT rolsuper FROM pg_roles WHERE rolname = current_user');
    return rows[0]?.rolsuper === true;
  } catch {
    return false;
  } finally {
    await c.end().catch(() => {});
  }
})();

describe.skipIf(!hayPostgres)('migrar (PostgreSQL real)', () => {
  const prefijo = `priora_t${randomBytes(3).toString('hex')}`;
  const config = configuracion(prefijo);
  let admin;
  let migrador;
  let app;
  let urls;
  let primera;
  let segunda;
  let filasAntes;
  let filasDespues;

  const conectarBase = async (base) => {
    const c = clienteAdmin(base);
    await c.connect();
    return c;
  };

  const conectar = async (connectionString) => {
    const c = new pg.Client({ connectionString });
    c.on('error', () => {});
    await c.connect();
    return c;
  };

  const contarMigraciones = async () => {
    const { rows } = await migrador.query(
      'SELECT count(*)::int AS n FROM drizzle.__drizzle_migrations',
    );
    return rows[0].n;
  };

  const limpiar = async () => {
    await resetear({ admin, config });
    for (const rol of Object.values(config.roles)) {
      await admin.query(`DROP ROLE IF EXISTS ${admin.escapeIdentifier(rol)}`);
    }
  };

  beforeAll(async () => {
    admin = clienteAdmin();
    await admin.connect();
    await limpiar();
    const resultado = await inicializar({ admin, conectarBase, config, textoEnv: '' });
    const env = parsearEnv(resultado.textoEnv);
    urls = {
      migrador: env.get('DATABASE_URL_MIGRATOR'),
      app: env.get('DATABASE_URL_APP'),
      test: env.get('DATABASE_URL_TEST'),
    };
    primera = await migrar({ urlMigrador: urls.migrador, rolApp: config.roles.app });
    migrador = await conectar(urls.migrador);
    filasAntes = await contarMigraciones();
    segunda = await migrar({ urlMigrador: urls.migrador, rolApp: config.roles.app });
    filasDespues = await contarMigraciones();
    app = await conectar(urls.app);
  }, 120000);

  afterAll(async () => {
    await app?.end().catch(() => {});
    await migrador?.end().catch(() => {});
    if (!admin) return;
    await limpiar();
    await admin.end();
  }, 60000);

  describe('aplicacion de migraciones', () => {
    it('la primera ejecucion crea el esquema pgboss', () => {
      expect(primera).toEqual({ pgbossCreado: true });
    });

    it('pgboss.job, pgboss.queue y pgboss.version existen y son del migrador', async () => {
      const { rows } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [
        config.bases.principal,
      ]);
      expect(rows).toHaveLength(1);
      const { rows: tablas } = await migrador.query(
        `SELECT tablename, tableowner FROM pg_tables
          WHERE schemaname = 'pgboss' AND tablename = ANY($1)`,
        [['job', 'queue', 'version']],
      );
      expect(tablas.map((t) => t.tablename).sort()).toEqual(['job', 'queue', 'version']);
      for (const t of tablas) expect(t.tableowner, t.tablename).toBe(config.roles.migrator);
    });

    it('la segunda ejecucion es idempotente', () => {
      expect(segunda).toEqual({ pgbossCreado: false });
      expect(filasAntes).toBeGreaterThan(0);
      expect(filasDespues).toBe(filasAntes);
    });

    it('PUBLIC no tiene CREATE sobre el esquema public', async () => {
      const { rows } = await migrador.query(
        "SELECT has_schema_privilege('public', 'public', 'CREATE') AS puede",
      );
      expect(rows[0].puede).toBe(false);
    });
  });

  describe('privilegios del rol de aplicacion', () => {
    it('lee pgboss.job y tiene DML sobre pgboss.queue', async () => {
      const { rows } = await app.query('SELECT count(*)::int AS n FROM pgboss.job');
      expect(rows[0].n).toBeGreaterThanOrEqual(0);
      for (const privilegio of ['SELECT', 'INSERT', 'UPDATE', 'DELETE']) {
        const { rows: r } = await app.query(
          'SELECT has_table_privilege(current_user, $1, $2) AS puede',
          ['pgboss.queue', privilegio],
        );
        expect(r[0].puede, privilegio).toBe(true);
      }
    });

    it.each([
      ['CREATE TABLE public.x (id int)'],
      ['CREATE TABLE pgboss.x (id int)'],
      ['CREATE SCHEMA y'],
    ])('no puede ejecutar DDL: %s', async (sql) => {
      await expect(app.query(sql)).rejects.toThrow();
    });

    it('no puede asumir el rol migrador', async () => {
      await expect(
        app.query(`SET ROLE ${admin.escapeIdentifier(config.roles.migrator)}`),
      ).rejects.toThrow();
    });

    it('no tiene CREATE en public ni en pgboss', async () => {
      for (const esquema of ['public', 'pgboss']) {
        const { rows } = await app.query(
          'SELECT has_schema_privilege(current_user, $1, $2) AS puede',
          [esquema, 'CREATE'],
        );
        expect(rows[0].puede, esquema).toBe(false);
      }
    });
  });

  describe('privilegios por defecto', () => {
    it('una tabla nueva del migrador queda con DML para el app sin GRANT explicito', async () => {
      await migrador.query('CREATE TABLE public.t_defecto (id int, v text)');
      await app.query("INSERT INTO public.t_defecto (id, v) VALUES (1, 'a')");
      await app.query("UPDATE public.t_defecto SET v = 'b' WHERE id = 1");
      const { rows } = await app.query('SELECT v FROM public.t_defecto WHERE id = 1');
      expect(rows).toEqual([{ v: 'b' }]);
      await app.query('DELETE FROM public.t_defecto WHERE id = 1');
      const { rows: vacias } = await app.query('SELECT count(*)::int AS n FROM public.t_defecto');
      expect(vacias[0].n).toBe(0);
    });
  });

  describe('RLS forzada', () => {
    beforeAll(async () => {
      await migrador.query('CREATE TABLE public.t_rls (tenant_id text, v int)');
      await migrador.query('ALTER TABLE public.t_rls ENABLE ROW LEVEL SECURITY');
      await migrador.query('ALTER TABLE public.t_rls FORCE ROW LEVEL SECURITY');
      await migrador.query(
        `CREATE POLICY aislamiento ON public.t_rls
           USING (tenant_id = current_setting('app.tenant_id', true))`,
      );
      // FORCE RLS también obliga al dueño: cada fila se inserta con su tenant fijado.
      for (const [tenant, v] of [
        ['A', 1],
        ['A', 2],
        ['B', 3],
      ]) {
        await migrador.query('BEGIN');
        await migrador.query("SELECT set_config('app.tenant_id', $1, true)", [tenant]);
        await migrador.query('INSERT INTO public.t_rls (tenant_id, v) VALUES ($1, $2)', [
          tenant,
          v,
        ]);
        await migrador.query('COMMIT');
      }
    });

    it('con el tenant fijado en la transaccion solo ve sus filas', async () => {
      await app.query('BEGIN');
      try {
        await app.query("SELECT set_config('app.tenant_id', 'A', true)");
        const { rows } = await app.query('SELECT tenant_id, v FROM public.t_rls ORDER BY v');
        expect(rows).toEqual([
          { tenant_id: 'A', v: 1 },
          { tenant_id: 'A', v: 2 },
        ]);
      } finally {
        await app.query('ROLLBACK');
      }
    });

    it('sin fijar la variable no ve ninguna fila', async () => {
      const { rows } = await app.query('SELECT count(*)::int AS n FROM public.t_rls');
      expect(rows[0].n).toBe(0);
    });

    it('no puede desactivar la RLS', async () => {
      await expect(
        app.query('ALTER TABLE public.t_rls DISABLE ROW LEVEL SECURITY'),
      ).rejects.toThrow();
    });

    it('no puede saltarse la RLS con row_security = off', async () => {
      try {
        await app.query('SET row_security = off');
        await expect(app.query('SELECT * FROM public.t_rls')).rejects.toThrow();
      } finally {
        await app.query('SET row_security = on');
      }
    });

    it('el rol de aplicacion no tiene BYPASSRLS', async () => {
      const { rows } = await admin.query('SELECT rolbypassrls FROM pg_roles WHERE rolname = $1', [
        config.roles.app,
      ]);
      expect(rows).toEqual([{ rolbypassrls: false }]);
    });
  });
});
