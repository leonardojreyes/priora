// pnpm bootstrap — deja el entorno de desarrollo listo (roles, bases, migraciones, semilla, Keycloak y realm). Idempotente.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pasosBootstrap } from './lib/orquestacion.mjs';

const raiz = join(import.meta.dirname, '..');
const pasos = pasosBootstrap({
  keycloakInstalado: existsSync(join(raiz, '.local', 'keycloak', '.instalado.json')),
  realmGenerado: existsSync(join(raiz, '.local', 'realm', 'priora-realm.json')),
});

for (const [i, { titulo, comando, args }] of pasos.entries()) {
  console.log(`\n[${i + 1}/${pasos.length}] ${titulo}`);
  const r = spawnSync(comando === 'node' ? process.execPath : comando, args, {
    cwd: raiz,
    stdio: 'inherit',
  });
  if (r.status !== 0) {
    console.error(`\n✖ Falló el paso "${titulo}". Corrígelo y vuelve a ejecutar pnpm bootstrap.`);
    process.exit(r.status ?? 1);
  }
}
console.log('\n✔ Entorno listo. Siguiente: pnpm dev');
