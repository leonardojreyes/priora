// pnpm verificar:esqueleto — con `pnpm dev` corriendo, comprueba /health de la API (con la base) y la web.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parsearEnv } from './lib/db-init.mjs';
import {
  formatearResultados,
  urlsPorDefecto,
  verificarEsqueleto,
} from './lib/verificar-esqueleto.mjs';

const archivoEnv = join(import.meta.dirname, '..', '.env.local');
const env = existsSync(archivoEnv) ? parsearEnv(readFileSync(archivoEnv, 'utf8')) : new Map();
const resultado = await verificarEsqueleto({
  fetch,
  urls: urlsPorDefecto({
    API_PORT: process.env.API_PORT ?? env.get('API_PORT'),
    WEB_PORT: process.env.WEB_PORT ?? env.get('WEB_PORT'),
  }),
});
console.log(formatearResultados(resultado));
if (!resultado.ok) process.exitCode = 1;
