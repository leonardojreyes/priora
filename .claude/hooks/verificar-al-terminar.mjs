// Stop: antes de que Claude dé por terminada su respuesta, revisa secretos, tipos y pruebas relacionadas
// sobre los archivos cambiados. Si algo falla, devuelve el error a Claude (código 2) una sola vez.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { leerEntrada, raizProyecto, bloquear, permitir } from './_comun.mjs';

const entrada = leerEntrada();
if (entrada?.stop_hook_active) permitir(); // evita bucles: ya se le devolvió un error en este turno

const raiz = raizProyecto();
function ejecutar(cmd, args, timeout = 180_000) {
  return spawnSync(cmd, args, { cwd: raiz, encoding: 'utf8', shell: process.platform === 'win32', timeout });
}

const git = ejecutar('git', ['status', '--porcelain', '-uall']);
if (git.status !== 0) permitir(); // aún no hay repositorio git
const cambiados = git.stdout
  .split(/\r?\n/)
  .filter(Boolean)
  .map((l) => l.slice(3).trim().replace(/^"|"$/g, ''))
  .filter((f) => existsSync(path.join(raiz, f)) && !f.endsWith('/'));
if (cambiados.length === 0) permitir();

const problemas = [];

// 1. Escaneo liviano de secretos en archivos cambiados (gitleaks corre en CI)
const patrones = [
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'clave privada'],
  [/AKIA[0-9A-Z]{16}/, 'clave de acceso AWS'],
  [/ghp_[A-Za-z0-9]{36}/, 'token de GitHub'],
  [/sk-[A-Za-z0-9_-]{20,}/, 'clave de API tipo sk-'],
  [/(password|passwd|secret|client_secret)\s*[:=]\s*['"][^'"\s]{8,}['"]/i, 'contraseña o secreto literal'],
];
for (const f of cambiados) {
  if (/\.(png|jpg|jpeg|gif|pdf|zip|ico|woff2?)$/i.test(f) || f.endsWith('.env.example')) continue;
  let texto = '';
  try { texto = readFileSync(path.join(raiz, f), 'utf8'); } catch { continue; }
  for (const [re, nombre] of patrones) {
    if (re.test(texto) && !/realm-priora\.json$/.test(f)) problemas.push(`Posible ${nombre} en ${f}`);
  }
}

// 2. Tipos y pruebas relacionadas (solo cuando el esqueleto ya existe)
const hayDependencias = existsSync(path.join(raiz, 'node_modules'));
const tsCambiados = cambiados.filter((f) => /\.(ts|tsx)$/.test(f));
if (hayDependencias && tsCambiados.length > 0) {
  const pkg = JSON.parse(readFileSync(path.join(raiz, 'package.json'), 'utf8'));
  if (pkg.scripts?.typecheck) {
    const r = ejecutar('pnpm', ['-s', 'typecheck']);
    if (r.status !== 0) problemas.push(`typecheck falló:\n${(r.stdout + r.stderr).slice(-2500)}`);
  }
  if (tsCambiados.length <= 25) {
    const r = ejecutar('pnpm', ['exec', 'vitest', 'related', '--run', '--passWithNoTests', ...tsCambiados]);
    if (r.status !== 0) problemas.push(`pruebas relacionadas fallaron:\n${(r.stdout + r.stderr).slice(-2500)}`);
  }
}

if (problemas.length) {
  bloquear(`verificar-al-terminar encontró problemas; corrígelos antes de terminar:\n- ${problemas.join('\n- ')}`);
}
permitir();
