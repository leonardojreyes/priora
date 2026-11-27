// Ejecuta `next` sin telemetría y con el puerto de WEB_PORT (3000 por defecto). Multiplataforma.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const [orden = 'dev', ...resto] = process.argv.slice(2);
const bin = join(
  dirname(createRequire(import.meta.url).resolve('next/package.json')),
  'dist',
  'bin',
  'next',
);
const puerto = process.env.WEB_PORT ?? '3000';
const args = ['dev', 'start'].includes(orden) ? [orden, '-p', puerto, ...resto] : [orden, ...resto];

const proceso = spawn(process.execPath, [bin, ...args], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});
proceso.on('exit', (codigo, senal) => process.exit(codigo ?? (senal ? 1 : 0)));
