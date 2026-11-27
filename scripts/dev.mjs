// pnpm dev — levanta api + worker + web; Ctrl+C los apaga. Comprueba PostgreSQL (obligatorio) y Keycloak (aviso).
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import pg from 'pg';
import { parsearEnv } from './lib/db-init.mjs';
import { evaluarPrevios, procesosDev } from './lib/orquestacion.mjs';

const raiz = join(import.meta.dirname, '..');
const win = process.platform === 'win32';
const archivoEnv = join(raiz, '.env.local');
const env = existsSync(archivoEnv) ? parsearEnv(readFileSync(archivoEnv, 'utf8')) : new Map();
const valor = (k) => process.env[k] ?? env.get(k);

const postgresListo = async () => {
  const url = valor('DATABASE_URL_APP');
  if (!url) return false;
  const cliente = new pg.Client({ connectionString: url, connectionTimeoutMillis: 2000 });
  try {
    await cliente.connect();
    await cliente.query('select 1');
    return true;
  } catch {
    return false;
  } finally {
    await cliente.end().catch(() => {});
  }
};
const keycloakListo = async () => {
  const url = `http://127.0.0.1:${valor('KEYCLOAK_PORT') ?? 8180}/realms/priora/.well-known/openid-configuration`;
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(2000) })).ok;
  } catch {
    return false;
  }
};

const { errores, avisos } = evaluarPrevios({
  postgresListo: await postgresListo(),
  keycloakListo: await keycloakListo(),
});
for (const a of avisos) console.warn(`⚠ ${a}`);
if (errores.length) {
  for (const e of errores) console.error(`✖ ${e}`);
  process.exit(1);
}

const { compilar, procesos } = procesosDev({ plataforma: process.platform });
console.log('Compilando api y worker…');
const build = spawnSync(compilar.comando, compilar.args, {
  cwd: raiz,
  stdio: 'inherit',
  shell: win,
});
if (build.status !== 0) {
  console.error('✖ Falló la compilación.');
  process.exit(build.status ?? 1);
}

const hijos = procesos.map(({ nombre, comando, args, shell }) => {
  const hijo = spawn(comando, args, { cwd: raiz, stdio: 'inherit', shell });
  hijo.on('exit', (codigo) => {
    if (!cerrando) {
      console.error(`✖ ${nombre} terminó (código ${codigo}); apagando el resto.`);
      apagar(codigo || 1);
    }
  });
  return hijo;
});

let cerrando = false;
const apagar = (codigo = 0) => {
  if (cerrando) return;
  cerrando = true;
  for (const h of hijos) {
    if (h.exitCode !== null || !h.pid) continue;
    if (win) spawnSync('taskkill', ['/pid', String(h.pid), '/T', '/F']);
    else h.kill('SIGTERM');
  }
  const limite = setTimeout(() => {
    for (const h of hijos) if (h.exitCode === null) h.kill('SIGKILL');
    process.exit(codigo);
  }, 10000);
  Promise.all(
    hijos.map((h) => (h.exitCode !== null ? null : new Promise((r) => h.once('exit', r)))),
  ).then(() => {
    clearTimeout(limite);
    process.exit(codigo);
  });
};
process.on('SIGINT', () => apagar(0));
process.on('SIGTERM', () => apagar(0));
console.log('api, worker y web en marcha. Ctrl+C para detener.');
