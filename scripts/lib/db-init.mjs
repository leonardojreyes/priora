// Lógica de `pnpm db:init`: crea los roles y las bases de PostgreSQL del proyecto de forma idempotente.
// Solo toca objetos con el prefijo del proyecto (por defecto `priora`); nunca los de otros proyectos.
// Nunca emite DROP.
import { randomBytes } from 'node:crypto';

const PATRON_PREFIJO = /^[a-z][a-z0-9_]{0,30}$/;

export const configuracion = (prefijo = 'priora') => {
  if (!PATRON_PREFIJO.test(prefijo)) {
    throw new Error(
      `Prefijo no válido: "${prefijo}" (minúsculas, dígitos y guion bajo; empieza con letra)`,
    );
  }
  return {
    prefijo,
    roles: {
      migrator: `${prefijo}_migrator`,
      app: `${prefijo}_app`,
      test: `${prefijo}_test`,
    },
    bases: { principal: prefijo, prueba: `${prefijo}_test` },
  };
};

export const generarClave = () => randomBytes(32).toString('base64url');

export const construirUrl = ({ usuario, clave, host, puerto, base }) =>
  `postgresql://${encodeURIComponent(usuario)}:${encodeURIComponent(clave)}@${host}:${puerto}/${base}`;

export const claveDeUrl = (url) => {
  if (!url) return undefined;
  try {
    const { password } = new URL(url);
    return password ? decodeURIComponent(password) : undefined;
  } catch {
    return undefined;
  }
};

export const parsearEnv = (texto) => {
  const mapa = new Map();
  for (const linea of texto.split(/\r?\n/)) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(linea);
    if (m) mapa.set(m[1], m[2]);
  }
  return mapa;
};

/** Actualiza o agrega claves en el texto de un archivo de entorno, conservando el resto de líneas. */
export const actualizarEnv = (texto, claves) => {
  const lineas = texto === '' ? [] : texto.replace(/\n$/, '').split('\n');
  for (const [clave, valor] of Object.entries(claves)) {
    const i = lineas.findIndex((l) => l.startsWith(`${clave}=`));
    if (i >= 0) lineas[i] = `${clave}=${valor}`;
    else lineas.push(`${clave}=${valor}`);
  }
  return `${lineas.join('\n')}\n`;
};

const ATRIBUTOS = 'LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS NOREPLICATION';

/**
 * Crea (o repara) roles y bases. `admin` es un cliente `pg` conectado como superusuario;
 * `conectarBase(nombre)` devuelve un cliente conectado a esa base (para las extensiones).
 */
export const inicializar = async ({
  admin,
  conectarBase,
  config,
  textoEnv,
  host = '127.0.0.1',
  puerto = 5432,
  generar = generarClave,
}) => {
  const id = (nombre) => admin.escapeIdentifier(nombre);
  const lit = (valor) => admin.escapeLiteral(valor);
  const env = parsearEnv(textoEnv);
  const { roles, bases } = config;

  const clave = {
    [roles.migrator]: claveDeUrl(env.get('DATABASE_URL_MIGRATOR')) ?? generar(),
    [roles.app]: claveDeUrl(env.get('DATABASE_URL_APP')) ?? generar(),
    [roles.test]: claveDeUrl(env.get('DATABASE_URL_TEST')) ?? generar(),
  };

  const creados = { roles: [], bases: [] };

  for (const rol of Object.values(roles)) {
    const { rows } = await admin.query('select rolname from pg_roles where rolname = $1', [rol]);
    if (rows.length > 0) {
      await admin.query(`ALTER ROLE ${id(rol)} ${ATRIBUTOS} PASSWORD ${lit(clave[rol])}`);
    } else {
      await admin.query(`CREATE ROLE ${id(rol)} ${ATRIBUTOS} PASSWORD ${lit(clave[rol])}`);
      creados.roles.push(rol);
    }
  }

  const duenos = { [bases.principal]: roles.migrator, [bases.prueba]: roles.test };
  for (const [base, dueno] of Object.entries(duenos)) {
    const { rows } = await admin.query('select datname from pg_database where datname = $1', [
      base,
    ]);
    if (rows.length > 0) {
      await admin.query(`ALTER DATABASE ${id(base)} OWNER TO ${id(dueno)}`);
    } else {
      await admin.query(`CREATE DATABASE ${id(base)} OWNER ${id(dueno)}`);
      creados.bases.push(base);
    }
  }

  // Solo los roles del proyecto pueden conectarse a sus bases.
  const conectan = {
    [bases.principal]: [roles.migrator, roles.app],
    [bases.prueba]: [roles.test, roles.app, roles.migrator],
  };
  for (const [base, lista] of Object.entries(conectan)) {
    await admin.query(`REVOKE ALL ON DATABASE ${id(base)} FROM PUBLIC`);
    for (const rol of lista) {
      await admin.query(`GRANT CONNECT ON DATABASE ${id(base)} TO ${id(rol)}`);
    }
  }

  for (const base of [bases.principal, bases.prueba]) {
    const cliente = await conectarBase(base);
    try {
      await cliente.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');
    } finally {
      await cliente.end();
    }
  }

  const url = (rol, base) => construirUrl({ usuario: rol, clave: clave[rol], host, puerto, base });
  const nuevoTexto = actualizarEnv(textoEnv, {
    DATABASE_URL_MIGRATOR: url(roles.migrator, bases.principal),
    DATABASE_URL_APP: url(roles.app, bases.principal),
    DATABASE_URL_TEST: url(roles.test, bases.prueba),
  });

  return { creados, textoEnv: nuevoTexto, cambios: nuevoTexto !== textoEnv };
};
