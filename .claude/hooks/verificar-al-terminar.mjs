// Stop: antes de que Claude dé por terminada su respuesta, revisa secretos, tipos y pruebas relacionadas
// sobre los archivos cambiados. Si algo falla, devuelve el error a Claude (código 2) una sola vez.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { leerEntrada, raizProyecto, bloquear, permitir } from './_comun.mjs';

const entrada = leerEntrada();
if (entrada?.stop_hook_active) permitir(); // evita bucles: ya se le devolvió un error en este turno

const raiz = raizProyecto();
function ejecutar(cmd, args, timeout = 180_000, cwd = raiz) {
  return spawnSync(cmd, args, { cwd, encoding: 'utf8', shell: process.platform === 'win32', timeout });
}

// Paquete del workspace al que pertenece un archivo: la carpeta con package.json más cercana, sin llegar a la raíz.
function paqueteDe(archivo) {
  let dir = path.dirname(path.join(raiz, archivo));
  while (dir.startsWith(raiz) && dir !== raiz) {
    if (existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return null;
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
    // Sin `-s`: pnpm 12 no lo acepta. Solo importa el código de salida.
    const r = ejecutar('pnpm', ['typecheck']);
    if (r.status !== 0) problemas.push(`typecheck falló:\n${(r.stdout + r.stderr).slice(-2500)}`);
  }
  if (tsCambiados.length <= 25) {
    // Vitest vive en cada paquete (no en la raíz): las pruebas relacionadas se buscan desde su propio paquete.
    const porPaquete = new Map();
    for (const archivo of tsCambiados) {
      const dir = paqueteDe(archivo);
      if (!dir) continue;
      const manifiesto = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'));
      if (!/vitest/.test(manifiesto.scripts?.test ?? '')) continue;
      porPaquete.set(dir, [...(porPaquete.get(dir) ?? []), path.relative(dir, path.join(raiz, archivo))]);
    }
    for (const [dir, archivos] of porPaquete) {
      const r = ejecutar('pnpm', ['exec', 'vitest', 'related', '--run', '--passWithNoTests', ...archivos], 180_000, dir);
      if (r.status !== 0) {
        problemas.push(`pruebas relacionadas fallaron en ${path.relative(raiz, dir)}:\n${(r.stdout + r.stderr).slice(-2500)}`);
      }
    }
  }
}

if (problemas.length) {
  bloquear(`verificar-al-terminar encontró problemas; corrígelos antes de terminar:\n- ${problemas.join('\n- ')}`);
}
permitir();
