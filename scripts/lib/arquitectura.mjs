import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const raizRepo = join(import.meta.dirname, '..', '..');
const configuracion = join(raizRepo, '.dependency-cruiser.cjs');
const bin = join(
  import.meta.dirname,
  '..',
  'node_modules',
  'dependency-cruiser',
  'bin',
  'dependency-cruiser.mjs',
);

/** Analiza apps, modules y packages de `cwd` con las reglas del repositorio. */
export const cruzarDependencias = async (cwd) => {
  const carpetas = ['apps', 'modules', 'packages'].filter((c) => existsSync(join(cwd, c)));
  if (carpetas.length === 0) return { ok: true, violaciones: [] };
  const proceso = spawnSync(
    process.execPath,
    [bin, '--config', configuracion, '--output-type', 'json', ...carpetas],
    { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  if (proceso.error || !proceso.stdout) {
    throw new Error(`dependency-cruiser falló: ${proceso.error?.message ?? proceso.stderr}`);
  }
  const { summary } = JSON.parse(proceso.stdout);
  const violaciones = [...new Set(summary.violations.map((v) => v.rule.name))].sort();
  return { ok: summary.error === 0, violaciones };
};

const archivos = (carpeta) =>
  readdirSync(carpeta, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && !e.parentPath.split(/[\\/]/).includes('node_modules'))
    .map((e) => join(e.parentPath, e.name));

/** Archivos de apps/ y modules/ que contienen el texto `.local/` (solo los scripts lo usan). */
export const buscarReferenciasLocal = async (raiz) =>
  ['apps', 'modules']
    .filter((c) => existsSync(join(raiz, c)))
    .flatMap((c) => archivos(join(raiz, c)))
    .filter((ruta) => readFileSync(ruta, 'utf8').includes('.local/'))
    .map((ruta) => relative(raiz, ruta).split(/[\\/]/).join('/'))
    .sort();
