// pnpm db:init — crea los roles y bases de PostgreSQL de Priora y escribe sus URLs en .env.local.
// Idempotente. Se conecta como superusuario local (PGUSER, por defecto el usuario del sistema).
import { chmodSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { userInfo } from 'node:os';
import { join } from 'node:path';
import pg from 'pg';
import { configuracion, inicializar } from './lib/db-init.mjs';

const raiz = join(import.meta.dirname, '..');
const arg = (nombre) => {
  const i = process.argv.indexOf(`--${nombre}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
};

const archivoEnv = arg('env') ?? join(raiz, '.env.local');
const config = configuracion(arg('prefijo') ?? 'priora');
const host = process.env.PGHOST ?? '127.0.0.1';
const puerto = Number(process.env.PGPORT ?? 5432);
const conexion = (database) => ({
  host,
  port: puerto,
  user: process.env.PGUSER ?? userInfo().username,
  database,
});

const admin = new pg.Client(conexion('postgres'));
try {
  await admin.connect();
} catch (error) {
  console.error(`✖ No pude conectarme a PostgreSQL en ${host}:${puerto}: ${error.message}`);
  console.error('  ¿Está corriendo? Puedes indicar otro usuario con PGUSER y PGPASSWORD.');
  process.exit(1);
}

try {
  const { rows } = await admin.query('select rolsuper from pg_roles where rolname = current_user');
  if (!rows[0]?.rolsuper) {
    console.error('✖ El usuario de conexión no es superusuario; indica otro con PGUSER.');
    process.exit(1);
  }

  const conectarBase = async (base) => {
    const cliente = new pg.Client(conexion(base));
    await cliente.connect();
    return cliente;
  };
  const textoEnv = existsSync(archivoEnv) ? readFileSync(archivoEnv, 'utf8') : '';
  const r = await inicializar({ admin, conectarBase, config, textoEnv, host, puerto });
  if (r.cambios) writeFileSync(archivoEnv, r.textoEnv, { mode: 0o600 });
  chmodSync(archivoEnv, 0o600);

  const marca = (nombre, lista, etiqueta) => `${nombre}${lista.includes(nombre) ? etiqueta : ''}`;
  console.log(
    `Roles: ${Object.values(config.roles)
      .map((x) => marca(x, r.creados.roles, ' (creado)'))
      .join(', ')}`,
  );
  console.log(
    `Bases: ${Object.values(config.bases)
      .map((x) => marca(x, r.creados.bases, ' (creada)'))
      .join(', ')}`,
  );
  console.log(
    r.cambios
      ? `Claves escritas en ${archivoEnv} (no se muestran).`
      : 'Sin cambios: todo estaba al día.',
  );
} finally {
  await admin.end();
}
