// Contrato OpenAPI y cliente TypeScript (ADR-0011): se generan desde la API y se versionan en
// packages/contracts. `verificarContratos` detecta la deriva entre lo versionado y lo generado.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const raiz = join(import.meta.dirname, '..', '..');
export const rutaContratos = join(raiz, 'packages', 'contracts');

const ARCHIVOS = ['openapi.json', join('src', 'generated', 'api.ts')];
const nodo = process.execPath;
const tsc = join(raiz, 'apps', 'api', 'node_modules', 'typescript', 'bin', 'tsc');
const orval = join(import.meta.dirname, '..', 'node_modules', 'orval', 'dist', 'bin', 'orval.mjs');

const ejecutar = (comando, argumentos, cwd) => {
  const r = spawnSync(comando, argumentos, { cwd, encoding: 'utf8' });
  if (r.status !== 0) {
    throw new Error(`${argumentos[0]} falló:\n${(r.stdout ?? '') + (r.stderr ?? '')}`.trim());
  }
};

/** Genera `openapi.json` y el cliente en `destino`. Compila la API primero. */
export const generarContratos = async ({ destino = rutaContratos } = {}) => {
  const api = join(raiz, 'apps', 'api');
  ejecutar(nodo, [tsc, '-p', 'tsconfig.build.json'], api);

  mkdirSync(destino, { recursive: true });
  const openapi = join(destino, ARCHIVOS[0]);
  ejecutar(nodo, [join(api, 'dist', 'generar-openapi.js'), openapi], api);

  const cliente = join(destino, ARCHIVOS[1]);
  mkdirSync(join(destino, 'src', 'generated'), { recursive: true });
  ejecutar(
    nodo,
    [orval, '--input', openapi, '--output', cliente, '--client', 'fetch', '--mode', 'single'],
    destino,
  );
};

/** Regenera en un directorio temporal y compara con lo versionado en `destino`. */
export const verificarContratos = async ({ destino = rutaContratos } = {}) => {
  const temporal = mkdtempSync(join(tmpdir(), 'priora-contratos-'));
  try {
    await generarContratos({ destino: temporal });
    const diferencias = ARCHIVOS.filter((archivo) => {
      const versionado = join(destino, archivo);
      return (
        !existsSync(versionado) ||
        readFileSync(versionado, 'utf8') !== readFileSync(join(temporal, archivo), 'utf8')
      );
    }).map((archivo) => archivo.split(/[\\/]/).join('/'));
    return { ok: diferencias.length === 0, diferencias };
  } finally {
    rmSync(temporal, { recursive: true, force: true });
  }
};
