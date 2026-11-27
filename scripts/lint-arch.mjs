import { buscarReferenciasLocal, cruzarDependencias } from './lib/arquitectura.mjs';
import { join } from 'node:path';

const raiz = join(import.meta.dirname, '..');
const { ok, violaciones } = await cruzarDependencias(raiz);
const locales = await buscarReferenciasLocal(raiz);

if (!ok) console.error(`Reglas violadas: ${violaciones.join(', ')}`);
if (locales.length > 0) console.error(`Referencian .local/: ${locales.join(', ')}`);
if (!ok || locales.length > 0) process.exit(1);
console.log('lint:arch en verde');
