// PostToolUse (Edit|MultiEdit|Write): formatea el archivo editado y valida plantillas.
// Antes del paso 0.2 (sin node_modules) no hace nada salvo validar sintaxis YAML/JSON si puede.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { leerEntrada, relativa, raizProyecto, bloquear, permitir } from './_comun.mjs';

const archivo = leerEntrada()?.tool_input?.file_path;
if (!archivo) permitir();

const raiz = raizProyecto();
const rel = relativa(archivo);
const ext = path.extname(rel).toLowerCase();
const hayDependencias = existsSync(path.join(raiz, 'node_modules'));

function ejecutar(cmd, args) {
  return spawnSync(cmd, args, { cwd: raiz, encoding: 'utf8', shell: process.platform === 'win32', timeout: 50_000 });
}

if (hayDependencias) {
  const formateables = ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md', '.yaml', '.yml', '.css'];
  if (formateables.includes(ext) && !rel.startsWith('docs/referencia/')) {
    ejecutar('pnpm', ['exec', 'prettier', '--write', '--log-level', 'warn', rel]);
  }
  if (['.ts', '.tsx'].includes(ext)) {
    const r = ejecutar('pnpm', ['exec', 'eslint', '--fix', '--quiet', rel]);
    if (r.status === 1 && r.stdout) {
      bloquear(`ESLint encontró errores que no se pudieron corregir en ${rel}:\n${r.stdout.slice(0, 3000)}`);
    }
  }
  let scripts = {};
  try { scripts = JSON.parse(readFileSync(path.join(raiz, 'package.json'), 'utf8')).scripts ?? {}; } catch {}
  if (scripts['plantillas:validar'] && rel.startsWith('plantillas/') && ['.yaml', '.yml'].includes(ext)) {
    const plantilla = rel.split('/').slice(0, 2).join('/');
    const r = ejecutar('pnpm', ['-s', 'plantillas:validar', plantilla]);
    if (r.status && r.status !== 0) {
      bloquear(`La plantilla ${plantilla} no valida después de editar ${rel}:\n${(r.stdout + r.stderr).slice(0, 3000)}`);
    }
  }
}
permitir();
