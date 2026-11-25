// PreToolUse (Edit|MultiEdit|Write): impide editar archivos protegidos.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { leerEntrada, relativa, bloquear, permitir, raizProyecto } from './_comun.mjs';

const entrada = leerEntrada();
const archivo = entrada?.tool_input?.file_path;
if (!archivo) permitir();

const rel = relativa(archivo);
const absoluta = path.resolve(raizProyecto(), archivo);
const existe = existsSync(absoluta);

function adrAceptado() {
  try {
    return /\*\*Estado:\*\*\s*Aceptado/.test(readFileSync(absoluta, 'utf8'));
  } catch {
    return false;
  }
}

// Permite la única edición válida de un ADR aceptado: agregar "Reemplazado por ADR-NNNN".
function soloMarcaReemplazo() {
  const { tool_name: herramienta, tool_input: t = {} } = entrada;
  if (herramienta !== 'Edit' || typeof t.old_string !== 'string' || typeof t.new_string !== 'string') return false;
  return t.new_string.startsWith(t.old_string) && /^\s*-?\s*\*\*Reemplazado por:\*\* ADR-\d{4}\s*$/.test(t.new_string.slice(t.old_string.length));
}

const reglas = [
  {
    si: () => /(^|\/)\.env(\.[^/]+)?$/.test(rel) && !rel.endsWith('.env.example'),
    motivo: 'Los archivos .env contienen secretos y no se editan desde Claude. Documenta la variable en .env.example y pide al responsable que la agregue.',
  },
  {
    si: () => /(^|\/)(migrations|drizzle)\/.+\.sql$/.test(rel) && existe,
    motivo: 'Las migraciones ya creadas son inmutables. Genera una migración nueva con `pnpm db:generate`.',
  },
  {
    si: () => rel.startsWith('docs/referencia/'),
    motivo: 'docs/referencia/ es la fuente funcional del cliente y es de solo lectura. Si detectas una diferencia, anótala en docs/fase0/estado.md.',
  },
  {
    si: () => /^infra\/(prod|produccion)\//.test(rel),
    motivo: 'La infraestructura de producción no se edita sin aprobación explícita del responsable.',
  },
  {
    si: () => rel === 'pnpm-lock.yaml',
    motivo: 'No edites pnpm-lock.yaml a mano; usa pnpm add/remove.',
  },
  {
    si: () => /^docs\/adr\/\d{4}-.+\.md$/.test(rel) && existe && adrAceptado() && !soloMarcaReemplazo(),
    motivo: 'Un ADR aceptado no se edita: crea uno nuevo con /adr que lo declare reemplazado.',
  },
];

for (const regla of reglas) {
  if (regla.si()) bloquear(`Bloqueado por proteger-archivos: ${rel}\n${regla.motivo}`);
}
permitir();
