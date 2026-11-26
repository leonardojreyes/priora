// pnpm db:reset — elimina y recrea las bases priora* y las migra. Pide confirmación (o --si).
import { existsSync, readFileSync } from 'node:fs';
import { userInfo } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import pg from 'pg';
import { configuracion, inicializar, parsearEnv } from './lib/db-init.mjs';
import { migrar } from './lib/db-migrate.mjs';
import { resetear } from './lib/db-reset.mjs';

const config = configuracion();
const bases = Object.values(config.bases).join(', ');

if (!process.argv.includes('--si')) {
  const lectura = createInterface({ input: process.stdin, output: process.stdout });
  const respuesta = await lectura.question(
    `Esto elimina TODOS los datos de ${bases}. Escribe "${config.prefijo}" para continuar: `,
  );
  lectura.close();
  if (respuesta.trim() !== config.prefijo) {
    console.log('Cancelado.');
    process.exit(1);
  }
}

const host = process.env.PGHOST ?? '127.0.0.1';
const puerto = Number(process.env.PGPORT ?? 5432);
const conexion = (database) => ({
  host,
  port: puerto,
  user: process.env.PGUSER ?? userInfo().username,
  database,
});
const archivoEnv = join(import.meta.dirname, '..', '.env.local');
const textoEnv = existsSync(archivoEnv) ? readFileSync(archivoEnv, 'utf8') : '';

const admin = new pg.Client(conexion('postgres'));
await admin.connect();
try {
  await resetear({ admin, config });
  const conectarBase = async (base) => {
    const cliente = new pg.Client(conexion(base));
    await cliente.connect();
    return cliente;
  };
  await inicializar({ admin, conectarBase, config, textoEnv, host, puerto });
  const env = parsearEnv(textoEnv);
  await migrar({ urlMigrador: env.get('DATABASE_URL_MIGRATOR'), rolApp: config.roles.app });
  console.log(`Bases ${bases} recreadas y migradas.`);
} finally {
  await admin.end();
}
