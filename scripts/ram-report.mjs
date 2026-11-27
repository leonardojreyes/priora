// pnpm ram-report — memoria residente de node, java (Keycloak) y postgres. Sirve para reabrir ADR-0012 con datos.
import { spawnSync } from 'node:child_process';
import { parsearPs, parsearTasklist, resumirRam } from './lib/orquestacion.mjs';

const win = process.platform === 'win32';
const r = win
  ? spawnSync('tasklist', ['/fo', 'csv', '/nh'], { encoding: 'utf8' })
  : spawnSync('ps', ['-axo', 'rss=,comm='], { encoding: 'utf8' });
if (r.status !== 0) {
  console.error('✖ No pude listar procesos.');
  process.exit(1);
}
const { grupos, totalMb } = resumirRam((win ? parsearTasklist : parsearPs)(r.stdout));
const propios = grupos.node + grupos.java + grupos.postgres;
console.log('Memoria residente (MB):');
for (const k of ['node', 'java', 'postgres'])
  console.log(`  ${k.padEnd(9)}${String(grupos[k]).padStart(7)}`);
console.log(`  ${'subtotal'.padEnd(9)}${String(propios).padStart(7)}  (node + java + postgres)`);
console.log(`  ${'sistema'.padEnd(9)}${String(totalMb).padStart(7)}  (todos los procesos)`);
