// pnpm contracts:generate | pnpm contracts:check
import { generarContratos, verificarContratos } from './lib/contratos.mjs';

const orden = process.argv[2];
if (orden === 'generate') {
  await generarContratos();
  console.log('Contrato y cliente generados en packages/contracts.');
} else if (orden === 'check') {
  const { ok, diferencias } = await verificarContratos();
  if (!ok) {
    console.error(
      `✖ Contrato desactualizado: ${diferencias.join(', ')}. Ejecuta pnpm contracts:generate.`,
    );
    process.exit(1);
  }
  console.log('Contrato y cliente al día.');
} else {
  console.error('Uso: node scripts/contratos.mjs generate|check');
  process.exit(2);
}
