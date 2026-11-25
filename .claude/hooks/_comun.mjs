// Utilidades compartidas por los hooks. Solo Node estándar: funciona igual en Windows y macOS.
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function leerEntrada() {
  try {
    const texto = readFileSync(0, 'utf8');
    return texto ? JSON.parse(texto) : {};
  } catch {
    return {};
  }
}

export function raizProyecto() {
  return process.env.CLAUDE_PROJECT_DIR || process.cwd();
}

/** Ruta relativa a la raíz, con separador "/" en cualquier sistema. */
export function relativa(archivo) {
  if (!archivo) return '';
  const rel = path.relative(raizProyecto(), path.resolve(raizProyecto(), archivo));
  return rel.split(path.sep).join('/');
}

/** Bloquea la acción: Claude Code muestra el mensaje a Claude (código de salida 2). */
export function bloquear(mensaje) {
  process.stderr.write(`${mensaje}\n`);
  process.exit(2);
}

export function permitir() {
  process.exit(0);
}
