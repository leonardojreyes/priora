import { randomBytes } from 'node:crypto';
import { userInfo } from 'node:os';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { configuracion, inicializar } from '../lib/db-init.mjs';
import { resetear } from '../lib/db-reset.mjs';

// ---------------------------------------------------------------------------
// Administrador simulado (sin Postgres)
// ---------------------------------------------------------------------------

const ajenos = /orbyta|sigiso|postgres/i;

const crearSimulado = () => {
  const consultas = [];
  const admin = {
    escapeIdentifier: (s) => `"${s}"`,
    escapeLiteral: (s) => `'${s}'`,
    query: async (sql) => {
      consultas.push(sql);
      return { rows: [], rowCount: 0 };
    },
  };
  return { admin, consultas };
};

describe('resetear (administrador simulado)', () => {
  const config = configuracion('priora_tx');

  it('emite exactamente un DROP DATABASE con FORCE por cada base de la config', async () => {
    const { admin, consultas } = crearSimulado();
    await resetear({ admin, config });
    const drops = consultas.filter((q) => /DROP\s+DATABASE/i.test(q));
    expect(drops).toHaveLength(Object.values(config.bases).length);
    for (const base of Object.values(config.bases)) {
      const propios = drops.filter((q) => q.includes(`"${base}"`));
      expect(propios, base).toHaveLength(1);
      expect(propios[0]).toMatch(/IF\s+EXISTS/i);
      expect(propios[0]).toMatch(/WITH\s*\(\s*FORCE\s*\)/i);
    }
  });

  it('todas las consultas solo nombran bases con el prefijo', async () => {
    const { admin, consultas } = crearSimulado();
    await resetear({ admin, config });
    expect(consultas.length).toBeGreaterThan(0);
    for (const q of consultas) {
      const nombres = [...q.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
      expect(nombres.length).toBeGreaterThan(0);
      for (const n of nombres) expect(n.startsWith(config.prefijo), q).toBe(true);
    }
  });

  it('con una config manipulada lanza antes de ejecutar cualquier consulta', async () => {
    const { admin, consultas } = crearSimulado();
    const manipulada = { ...config, bases: { ...config.bases, principal: 'orbyta' } };
    await expect(resetear({ admin, config: manipulada })).rejects.toThrow();
    expect(consultas).toEqual([]);
  });

  it('lanza aunque la base ajena sea la segunda de la lista', async () => {
    const { admin, consultas } = crearSimulado();
    const manipulada = { ...config, bases: { ...config.bases, prueba: 'sigiso' } };
    await expect(resetear({ admin, config: manipulada })).rejects.toThrow();
    expect(consultas).toEqual([]);
  });

  it('nunca nombra bases ajenas ni emite DROP ROLE', async () => {
    const { admin, consultas } = crearSimulado();
    await resetear({ admin, config });
    for (const q of consultas) {
      expect(q).not.toMatch(ajenos);
      expect(q).not.toMatch(/DROP\s+ROLE/i);
      expect(q).not.toMatch(/DROP\s+USER/i);
    }
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

describe.skipIf(!hayPostgres)('resetear (PostgreSQL real)', () => {
  const prefijo = `priora_t${randomBytes(3).toString('hex')}`;
  const cfg = configuracion(prefijo);
  let admin;

  const conectarBase = async (base) => {
    const c = clienteAdmin(base);
    await c.connect();
    return c;
  };

  const correrInit = () => inicializar({ admin, conectarBase, config: cfg, textoEnv: '' });

  const basesPropias = async () => {
    const { rows } = await admin.query('SELECT datname FROM pg_database WHERE datname = ANY($1)', [
      Object.values(cfg.bases),
    ]);
    return rows.map((r) => r.datname).sort();
  };

  const rolesPropios = async () => {
    const { rows } = await admin.query('SELECT rolname FROM pg_roles WHERE rolname = ANY($1)', [
      Object.values(cfg.roles),
    ]);
    return rows.map((r) => r.rolname).sort();
  };

  const ajenas = async () => {
    const { rows } = await admin.query(
      `SELECT d.datname, r.rolname AS dueno, d.datacl::text AS datacl
         FROM pg_database d JOIN pg_roles r ON r.oid = d.datdba
        WHERE left(d.datname, length($1)) <> $1
        ORDER BY d.datname`,
      [prefijo],
    );
    return rows;
  };

  const limpiar = async () => {
    for (const base of Object.values(cfg.bases)) {
      await admin.query(`DROP DATABASE IF EXISTS ${admin.escapeIdentifier(base)} WITH (FORCE)`);
    }
    for (const rol of Object.values(cfg.roles)) {
      await admin.query(`DROP ROLE IF EXISTS ${admin.escapeIdentifier(rol)}`);
    }
  };

  beforeAll(async () => {
    admin = clienteAdmin();
    await admin.connect();
    await limpiar();
  }, 60000);

  afterAll(async () => {
    if (!admin) return;
    await limpiar();
    await admin.end();
  }, 60000);

  it('elimina las bases propias, conserva los roles y no toca las ajenas', async () => {
    await correrInit();
    expect(await basesPropias()).toEqual(Object.values(cfg.bases).sort());
    const antes = await ajenas();

    await resetear({ admin, config: cfg });

    expect(await basesPropias()).toEqual([]);
    expect(await rolesPropios()).toEqual(Object.values(cfg.roles).sort());
    expect(await ajenas()).toEqual(antes);
  });

  it('es idempotente cuando las bases ya no existen', async () => {
    await expect(resetear({ admin, config: cfg })).resolves.not.toThrow();
    expect(await basesPropias()).toEqual([]);
  });

  it('inicializar vuelve a crear las bases despues del reset', async () => {
    const resultado = await correrInit();
    expect(resultado.creados.bases.sort()).toEqual(Object.values(cfg.bases).sort());
    expect(resultado.creados.roles).toEqual([]);
    expect(await basesPropias()).toEqual(Object.values(cfg.bases).sort());
  });
});
