import { resolve } from 'node:path';
import { validarPlantilla } from './lib/validar-plantillas.mjs';

const carpeta = process.argv[2];
if (!carpeta) {
  console.error('Uso: pnpm plantillas:validar <carpeta de la plantilla>');
  process.exit(2);
}

const { ok, errores } = await validarPlantilla(resolve(carpeta));
for (const e of errores) console.error(`✗ [${e.codigo}] ${e.archivo}: ${e.mensaje}`);
if (!ok) process.exit(1);
console.log(`Plantilla válida: ${carpeta}`);
