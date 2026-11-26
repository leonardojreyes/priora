import { randomBytes } from 'node:crypto';
import { userInfo } from 'node:os';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  actualizarEnv,
  claveDeUrl,
  configuracion,
  construirUrl,
  generarClave,
  inicializar,
  parsearEnv,
} from '../lib/db-init.mjs';

// ---------------------------------------------------------------------------
// Administrador simulado (sin Postgres)
// ---------------------------------------------------------------------------

const ajenos = /orbyta|sigsio/i;

function crearSimulado({ roles = [], bases = [] } = {}) {
  const rolesExistentes = new Set(roles);
  const basesExistentes = new Set(bases);
  const consultas = [];
  const conexiones = [];

  const nombreConsultado = (sql, params, conocidos) => {
    if (params && params.length > 0 && typeof params[0] === 'string') return params[0];
    return conocidos.find((n) => sql.includes(n)) ?? null;
  };

  const admin = {
    escapeIdentifier: (s) => `"${s}"`,
    escapeLiteral: (s) => `'${s}'`,
    query: async (sql, params) => {
      consultas.push(sql);
      if (/^\s*select/i.test(sql) && /pg_roles/i.test(sql)) {
        const n = nombreConsultado(sql, params, [...rolesExistentes, ...nombresRoles]);
        return { rows: n && rolesExistentes.has(n) ? [{ rolname: n }] : [], rowCount: 0 };
      }
      if (/^\s*select/i.test(sql) && /pg_database/i.test(sql)) {
        const n = nombreConsultado(sql, params, [...basesExistentes, ...nombresBases]);
        return { rows: n && basesExistentes.has(n) ? [{ datname: n }] : [], rowCount: 0 };
      }
      return { rows: [], rowCount: 0 };
    },
  };

  const nombresRoles = [];
  const nombresBases = [];

  const conectarBase = async (nombre) => {
    const registro = { base: nombre, consultas: [], cerrada: false };
    conexiones.push(registro);
    return {
      query: async (sql) => {
        registro.consultas.push(sql);
        return { rows: [], rowCount: 0 };
      },
      end: async () => {
        registro.cerrada = true;
      },
    };
  };

  return { admin, conectarBase, consultas, conexiones, nombresRoles, nombresBases };
}

let contador = 0;
const generarDeterminista = () => `clave-${(contador += 1)}`;

const todasLasConsultas = (sim) => [
  ...sim.consultas,
  ...sim.conexiones.flatMap((c) => c.consultas),
];

// ---------------------------------------------------------------------------
// Unidad
// ---------------------------------------------------------------------------

describe('configuracion', () => {
  it('usa el prefijo priora por defecto', () => {
    expect(configuracion()).toEqual({
      prefijo: 'priora',
      roles: { migrator: 'priora_migrator', app: 'priora_app', test: 'priora_test' },
      bases: { principal: 'priora', prueba: 'priora_test' },
    });
  });

  it('deriva los nombres del prefijo indicado', () => {
    const c = configuracion('acme_dev');
    expect(c.roles).toEqual({
      migrator: 'acme_dev_migrator',
      app: 'acme_dev_app',
      test: 'acme_dev_test',
    });
    expect(c.bases).toEqual({ principal: 'acme_dev', prueba: 'acme_dev_test' });
  });

  it.each([
    ['vacio', ''],
    ['mayusculas', 'Priora'],
    ['empieza con digito', '1priora'],
    ['con comillas', 'p"; DROP DATABASE x; --'],
    ['con espacio', 'pri ora'],
    ['con guion', 'pri-ora'],
    ['con punto', 'a.b'],
    ['demasiado largo', 'a'.repeat(32)],
    ['con punto y coma', 'a;b'],
    ['con comilla simple', "a'b"],
  ])('rechaza prefijos no validos: %s', (_nombre, prefijo) => {
    expect(() => configuracion(prefijo)).toThrow();
  });

  it('acepta el largo maximo', () => {
    expect(() => configuracion('a'.repeat(31))).not.toThrow();
  });
});

describe('generarClave', () => {
  it('genera claves largas, seguras para URL y distintas', () => {
    const a = generarClave();
    const b = generarClave();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThanOrEqual(24);
    expect(a).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});

describe('urls', () => {
  it('construye una URL y recupera la clave', () => {
    const url = construirUrl({
      usuario: 'priora_app',
      clave: 'abc123',
      host: '127.0.0.1',
      puerto: 5432,
      base: 'priora',
    });
    const u = new URL(url);
    expect(u.protocol).toMatch(/^postgres(ql)?:$/);
    expect(u.hostname).toBe('127.0.0.1');
    expect(u.port).toBe('5432');
    expect(u.username).toBe('priora_app');
    expect(u.pathname).toBe('/priora');
    expect(claveDeUrl(url)).toBe('abc123');
  });

  it('codifica caracteres especiales de la clave', () => {
    const clave = 'a/b:c@d#e?f';
    const url = construirUrl({ usuario: 'u', clave, host: 'h', puerto: 1, base: 'b' });
    expect(claveDeUrl(url)).toBe(clave);
  });

  it('claveDeUrl devuelve null o vacio ante una URL sin clave', () => {
    const sinClave = ['postgresql', '://', 'u@h:1/b'].join('');
    expect(claveDeUrl(sinClave) || null).toBeNull();
  });
});

describe('helpers de env', () => {
  it('parsearEnv ignora comentarios y lineas vacias', () => {
    const m = parsearEnv('# comentario\n\nA=1\nB=dos palabras\n');
    expect(m).toBeInstanceOf(Map);
    expect(m.get('A')).toBe('1');
    expect(m.get('B')).toBe('dos palabras');
    expect(m.size).toBe(2);
  });

  it('actualizarEnv agrega claves nuevas y conserva el resto', () => {
    const base = '# nota\nOTRA=valor\n';
    const out = actualizarEnv(base, { NUEVA: 'x' });
    expect(out).toContain('# nota');
    expect(out).toContain('OTRA=valor');
    expect(parsearEnv(out).get('NUEVA')).toBe('x');
  });

  it('actualizarEnv reemplaza una clave existente sin duplicarla', () => {
    const out = actualizarEnv('A=1\nB=2\n', { A: '9' });
    expect(parsearEnv(out).get('A')).toBe('9');
    expect(parsearEnv(out).get('B')).toBe('2');
    expect(out.match(/^A=/gm)).toHaveLength(1);
  });

  it('actualizarEnv es idempotente', () => {
    const una = actualizarEnv('A=1\n', { B: '2', C: '3' });
    const dos = actualizarEnv(una, { B: '2', C: '3' });
    expect(dos).toBe(una);
  });
});

describe('inicializar (administrador simulado)', () => {
  const ejecutar = async (opciones = {}, estado = {}) => {
    const config = configuracion('priora');
    const sim = crearSimulado(estado);
    sim.nombresRoles.push(...Object.values(config.roles));
    sim.nombresBases.push(...Object.values(config.bases));
    const resultado = await inicializar({
      admin: sim.admin,
      conectarBase: sim.conectarBase,
      config,
      textoEnv: '',
      generar: generarDeterminista,
      ...opciones,
    });
    return { sim, config, resultado };
  };

  it('crea los tres roles sin privilegios peligrosos', async () => {
    const { sim, config, resultado } = await ejecutar();
    const creaciones = sim.consultas.filter((q) => /CREATE\s+ROLE/i.test(q));
    expect(creaciones).toHaveLength(3);
    for (const rol of Object.values(config.roles)) {
      const q = creaciones.find((c) => c.includes(rol));
      expect(q, rol).toBeDefined();
      expect(q).toMatch(/\bLOGIN\b/i);
      expect(q).toMatch(/\bNOSUPERUSER\b/i);
      expect(q).toMatch(/\bNOBYPASSRLS\b/i);
      expect(q).toMatch(/\bNOCREATEDB\b/i);
      expect(q).toMatch(/\bNOCREATEROLE\b/i);
      expect(q).toMatch(/\bNOREPLICATION\b/i);
      expect(q).toMatch(/PASSWORD/i);
    }
    expect(resultado.creados.roles.sort()).toEqual(Object.values(config.roles).sort());
  });

  it('crea las dos bases con los duenos indicados', async () => {
    const { sim, config, resultado } = await ejecutar();
    const creaciones = sim.consultas.filter((q) => /CREATE\s+DATABASE/i.test(q));
    expect(creaciones).toHaveLength(2);
    const principal = creaciones.find((q) => q.includes(`"${config.bases.principal}"`));
    const prueba = creaciones.find((q) => q.includes(`"${config.bases.prueba}"`));
    expect(principal).toMatch(new RegExp(`OWNER\\s+"${config.roles.migrator}"`, 'i'));
    expect(prueba).toMatch(new RegExp(`OWNER\\s+"${config.roles.test}"`, 'i'));
    expect(resultado.creados.bases.sort()).toEqual(Object.values(config.bases).sort());
  });

  it('revoca PUBLIC y concede CONNECT segun lo previsto', async () => {
    const { sim, config } = await ejecutar();
    for (const base of Object.values(config.bases)) {
      expect(
        sim.consultas.some(
          (q) => /REVOKE\s+ALL\s+ON\s+DATABASE/i.test(q) && q.includes(base) && /PUBLIC/i.test(q),
        ),
        base,
      ).toBe(true);
    }
    const concede = (base, rol) =>
      sim.consultas.some(
        (q) =>
          /GRANT\s+CONNECT\s+ON\s+DATABASE/i.test(q) &&
          q.includes(`"${base}"`) &&
          q.includes(`"${rol}"`),
      );
    expect(concede(config.bases.principal, config.roles.migrator)).toBe(true);
    expect(concede(config.bases.principal, config.roles.app)).toBe(true);
    expect(concede(config.bases.principal, config.roles.test)).toBe(false);
    expect(concede(config.bases.prueba, config.roles.test)).toBe(true);
    expect(concede(config.bases.prueba, config.roles.app)).toBe(true);
    expect(concede(config.bases.prueba, config.roles.migrator)).toBe(true);
  });

  it('instala pg_trgm en las dos bases y cierra esas conexiones', async () => {
    const { sim, config } = await ejecutar();
    expect(sim.conexiones.map((c) => c.base).sort()).toEqual(Object.values(config.bases).sort());
    for (const c of sim.conexiones) {
      expect(
        c.consultas.some((q) => /CREATE\s+EXTENSION\s+IF\s+NOT\s+EXISTS\s+pg_trgm/i.test(q)),
      ).toBe(true);
      expect(c.cerrada).toBe(true);
    }
  });

  it('nunca emite DROP ni toca objetos fuera del prefijo', async () => {
    for (const estado of [{}, { roles: ['priora_app'], bases: ['priora'] }]) {
      const { sim } = await ejecutar({}, estado);
      for (const q of todasLasConsultas(sim)) {
        expect(q).not.toMatch(/\bDROP\b/i);
        expect(q).not.toMatch(ajenos);
        expect(q).not.toMatch(/(ROLE|DATABASE|OWNER\s+TO)\s+"?postgres"?/i);
      }
    }
  });

  it('escribe las tres URLs con la base y el rol correctos', async () => {
    const { resultado, config } = await ejecutar({ host: '127.0.0.1', puerto: 5433 });
    const env = parsearEnv(resultado.textoEnv);
    const esperado = {
      DATABASE_URL_MIGRATOR: [config.roles.migrator, config.bases.principal],
      DATABASE_URL_APP: [config.roles.app, config.bases.principal],
      DATABASE_URL_TEST: [config.roles.test, config.bases.prueba],
    };
    for (const [variable, [usuario, base]] of Object.entries(esperado)) {
      const u = new URL(env.get(variable));
      expect(u.username).toBe(usuario);
      expect(u.pathname).toBe(`/${base}`);
      expect(u.hostname).toBe('127.0.0.1');
      expect(u.port).toBe('5433');
      expect(claveDeUrl(env.get(variable))).toBeTruthy();
    }
    expect(resultado.cambios).toBe(true);
  });

  it('reutiliza las claves del env previo y no marca cambios', async () => {
    const primera = await ejecutar();
    const segunda = await ejecutar({ textoEnv: primera.resultado.textoEnv });
    expect(segunda.resultado.textoEnv).toBe(primera.resultado.textoEnv);
    expect(segunda.resultado.cambios).toBe(false);
  });

  it('conserva el resto del env', async () => {
    const { resultado } = await ejecutar({ textoEnv: '# mia\nOTRA=valor\n' });
    expect(resultado.textoEnv).toContain('# mia');
    expect(parsearEnv(resultado.textoEnv).get('OTRA')).toBe('valor');
  });

  it('emite ALTER y no CREATE cuando el rol o la base ya existen', async () => {
    const config = configuracion('priora');
    const { sim, resultado } = await ejecutar(
      {},
      { roles: Object.values(config.roles), bases: Object.values(config.bases) },
    );
    expect(sim.consultas.some((q) => /CREATE\s+ROLE/i.test(q))).toBe(false);
    expect(sim.consultas.some((q) => /CREATE\s+DATABASE/i.test(q))).toBe(false);
    expect(sim.consultas.filter((q) => /ALTER\s+ROLE/i.test(q))).toHaveLength(3);
    expect(resultado.creados).toEqual({ roles: [], bases: [] });
    for (const q of sim.consultas.filter((x) => /ALTER\s+ROLE/i.test(x))) {
      expect(q).toMatch(/NOSUPERUSER/i);
      expect(q).toMatch(/NOBYPASSRLS/i);
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

describe.skipIf(!hayPostgres)('inicializar (PostgreSQL real)', () => {
  const prefijo = `priora_t${randomBytes(3).toString('hex')}`;
  const config = configuracion(prefijo);
  const rolAjeno = `${prefijo}_ajeno`;
  let admin;

  const conectarBase = async (base) => {
    const c = clienteAdmin(base);
    await c.connect();
    return c;
  };

  const correr = (textoEnv) =>
    inicializar({ admin, conectarBase, config, textoEnv, host: HOST, puerto: PUERTO });

  const intentar = async (connectionString) => {
    const c = new pg.Client({ connectionString });
    c.on('error', () => {});
    try {
      await c.connect();
      await c.query('SELECT 1');
      return true;
    } catch {
      return false;
    } finally {
      await c.end().catch(() => {});
    }
  };

  const instantanea = async () => {
    const bases = await admin.query(
      `SELECT d.datname, r.rolname AS dueno, d.datacl::text AS datacl
         FROM pg_database d JOIN pg_roles r ON r.oid = d.datdba
        WHERE left(d.datname, length($1)) <> $1
        ORDER BY d.datname`,
      [prefijo],
    );
    const roles = await admin.query(
      `SELECT rolname, rolsuper, rolbypassrls FROM pg_roles
        WHERE left(rolname, length($1)) <> $1
        ORDER BY rolname`,
      [prefijo],
    );
    return { bases: bases.rows, roles: roles.rows };
  };

  const limpiar = async () => {
    for (const base of Object.values(config.bases)) {
      await admin.query(`DROP DATABASE IF EXISTS ${admin.escapeIdentifier(base)} WITH (FORCE)`);
    }
    for (const rol of [...Object.values(config.roles), rolAjeno]) {
      await admin.query(`DROP ROLE IF EXISTS ${admin.escapeIdentifier(rol)}`);
    }
  };

  let envInicial;
  let resultadoInicial;
  let antes;

  beforeAll(async () => {
    admin = clienteAdmin();
    await admin.connect();
    await limpiar();
    antes = await instantanea();
    resultadoInicial = await correr('# previo\nOTRA=valor\n');
    envInicial = resultadoInicial.textoEnv;
  });

  afterAll(async () => {
    if (!admin) return;
    await limpiar();
    await admin.end();
  });

  const urlsDe = (texto) => {
    const e = parsearEnv(texto);
    return {
      migrator: e.get('DATABASE_URL_MIGRATOR'),
      app: e.get('DATABASE_URL_APP'),
      test: e.get('DATABASE_URL_TEST'),
    };
  };

  it('crea los roles sin superusuario ni BYPASSRLS', async () => {
    const { rows } = await admin.query(
      `SELECT rolname, rolsuper, rolbypassrls, rolcreatedb, rolcreaterole, rolreplication, rolcanlogin
         FROM pg_roles WHERE rolname = ANY($1)`,
      [Object.values(config.roles)],
    );
    expect(rows).toHaveLength(3);
    for (const r of rows) {
      expect(r.rolsuper).toBe(false);
      expect(r.rolbypassrls).toBe(false);
      expect(r.rolcreatedb).toBe(false);
      expect(r.rolcreaterole).toBe(false);
      expect(r.rolreplication).toBe(false);
      expect(r.rolcanlogin).toBe(true);
    }
  });

  it('asigna los duenos correctos a las bases', async () => {
    const { rows } = await admin.query(
      `SELECT d.datname, r.rolname AS dueno FROM pg_database d
         JOIN pg_roles r ON r.oid = d.datdba WHERE d.datname = ANY($1)`,
      [Object.values(config.bases)],
    );
    const duenos = Object.fromEntries(rows.map((r) => [r.datname, r.dueno]));
    expect(duenos[config.bases.principal]).toBe(config.roles.migrator);
    expect(duenos[config.bases.prueba]).toBe(config.roles.test);
  });

  it('las tres URLs conectan con su rol', async () => {
    const urls = urlsDe(envInicial);
    expect(await intentar(urls.migrator)).toBe(true);
    expect(await intentar(urls.app)).toBe(true);
    expect(await intentar(urls.test)).toBe(true);
  });

  it('el rol de prueba no puede conectar a la base principal', async () => {
    const urls = urlsDe(envInicial);
    const clave = claveDeUrl(urls.test);
    const url = construirUrl({
      usuario: config.roles.test,
      clave,
      host: HOST,
      puerto: PUERTO,
      base: config.bases.principal,
    });
    expect(await intentar(url)).toBe(false);
  });

  it('un rol ajeno no puede conectarse a las bases', async () => {
    const clave = generarClave();
    await admin.query(
      `CREATE ROLE ${admin.escapeIdentifier(rolAjeno)} LOGIN PASSWORD ${admin.escapeLiteral(clave)}`,
    );
    for (const base of Object.values(config.bases)) {
      const url = construirUrl({ usuario: rolAjeno, clave, host: HOST, puerto: PUERTO, base });
      expect(await intentar(url), base).toBe(false);
    }
  });

  it('pg_trgm queda instalada en ambas bases', async () => {
    for (const base of Object.values(config.bases)) {
      const c = clienteAdmin(base);
      await c.connect();
      try {
        const { rows } = await c.query(`SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm'`);
        expect(rows, base).toHaveLength(1);
      } finally {
        await c.end();
      }
    }
  });

  it('conserva el resto del env', () => {
    expect(envInicial).toContain('# previo');
    expect(parsearEnv(envInicial).get('OTRA')).toBe('valor');
  });

  it('una segunda ejecucion no cambia nada', async () => {
    const segunda = await correr(envInicial);
    expect(segunda.cambios).toBe(false);
    expect(segunda.creados).toEqual({ roles: [], bases: [] });
    expect(segunda.textoEnv).toBe(envInicial);
  });

  it('si se pierde el env repone las claves sin recrear', async () => {
    const tercera = await correr('');
    expect(tercera.creados).toEqual({ roles: [], bases: [] });
    expect(tercera.cambios).toBe(true);
    const urls = urlsDe(tercera.textoEnv);
    expect(await intentar(urls.migrator)).toBe(true);
    expect(await intentar(urls.app)).toBe(true);
    expect(await intentar(urls.test)).toBe(true);
    // las URLs anteriores ya no sirven: la clave fue repuesta (solo verificable si el servidor
    // valida claves; con autenticación `trust` cualquier clave conecta)
    const erronea = new URL(urls.app);
    erronea.password = 'clave-erronea';
    if (!(await intentar(erronea.toString()))) {
      const viejas = urlsDe(envInicial);
      expect(await intentar(viejas.app)).toBe(false);
    }
    envInicial = tercera.textoEnv;
  });

  it('deja intactas las demas bases y roles', async () => {
    await correr(envInicial);
    const despues = await instantanea();
    expect(despues.bases).toEqual(antes.bases);
    expect(despues.roles).toEqual(antes.roles);
  });
});
