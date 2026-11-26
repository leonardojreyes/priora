// pnpm db:migrate — aplica migraciones, crea el esquema pgboss y otorga privilegios a priora_app.
// `--prueba` migra la base de pruebas (DATABASE_URL_TEST); sin la opción, la de desarrollo.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { configuracion, parsearEnv } from './lib/db-init.mjs';
import { migrar } from './lib/db-migrate.mjs';

const prueba = process.argv.includes('--prueba');
const archivoEnv = join(import.meta.dirname, '..', '.env.local');
const env = existsSync(archivoEnv) ? parsearEnv(readFileSync(archivoEnv, 'utf8')) : new Map();
const variable = prueba ? 'DATABASE_URL_TEST' : 'DATABASE_URL_MIGRATOR';
const urlMigrador = process.env[variable] ?? env.get(variable);
const config = configuracion();

if (!urlMigrador) {
  console.error(`✖ Falta ${variable}. Ejecuta primero pnpm db:init.`);
  process.exit(1);
}

try {
  const base = prueba ? config.bases.prueba : config.bases.principal;
  const { pgbossCreado } = await migrar({ urlMigrador, rolApp: config.roles.app });
  console.log(`Migraciones al día en ${base}${pgbossCreado ? '; esquema pgboss creado' : ''}.`);
} catch (error) {
  console.error(`✖ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
