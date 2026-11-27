// pnpm keycloak:realm — genera el realm de desarrollo resuelto en .local/realm/ (ignorado por git) a partir de la
// plantilla de infra/keycloak/ y secretos generados (ADR-0020). Idempotente: no cambia los secretos ya entregados.
// Escribe en .env.local el secreto del cliente web y el administrador. No imprime ningún secreto.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { actualizarEnv } from './lib/db-init.mjs';
import { generarSecretos, resolverRealm } from './lib/realm-keycloak.mjs';

const raiz = join(import.meta.dirname, '..');
const leerJson = (ruta) => JSON.parse(readFileSync(ruta, 'utf8'));
const escribirPrivado = (ruta, texto) => {
  mkdirSync(dirname(ruta), { recursive: true });
  writeFileSync(ruta, texto, { mode: 0o600 });
};

try {
  const origenWeb = process.env.WEB_ORIGIN ?? 'http://localhost:3000';
  const archivoSecretos = join(raiz, '.local', 'secretos-keycloak.json');
  const archivoRealm = join(raiz, '.local', 'realm', 'priora-realm.json');
  const archivoEnv = join(raiz, '.env.local');

  const secretos = generarSecretos({
    existentes: existsSync(archivoSecretos) ? leerJson(archivoSecretos) : {},
  });
  escribirPrivado(archivoSecretos, `${JSON.stringify(secretos, null, 2)}\n`);

  const realm = resolverRealm({
    plantilla: leerJson(join(raiz, 'infra', 'keycloak', 'realm-priora.plantilla.json')),
    valores: { WEB_ORIGIN: origenWeb, ...secretos.marcadores },
  });
  escribirPrivado(archivoRealm, `${JSON.stringify(realm, null, 2)}\n`);

  const textoEnv = existsSync(archivoEnv) ? readFileSync(archivoEnv, 'utf8') : '';
  escribirPrivado(
    archivoEnv,
    actualizarEnv(textoEnv, {
      OIDC_CLIENT_SECRET: secretos.marcadores.OIDC_CLIENT_SECRET,
      KEYCLOAK_ADMIN_USER: 'priora-admin',
      KEYCLOAK_ADMIN_PASSWORD: secretos.adminPassword,
    }),
  );

  console.log('Realm resuelto: .local/realm/priora-realm.json (ignorado por git)');
  console.log('Secretos del cliente web y del administrador: .env.local');
} catch (error) {
  console.error(`✖ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
