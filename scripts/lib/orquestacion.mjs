// Lógica pura de `pnpm bootstrap`, `pnpm dev` y `pnpm ram-report` (sin procesos ni red: se prueba en unidad).

const paso = (id, titulo, args) => ({ id, titulo, comando: 'node', args });

export const pasosBootstrap = ({ keycloakInstalado }) => [
  paso('db-init', 'Roles, bases y .env.local', ['scripts/db-init.mjs']),
  paso('db-migrate', 'Migraciones (desarrollo)', ['scripts/db-migrate.mjs']),
  paso('db-migrate-prueba', 'Migraciones (pruebas)', ['scripts/db-migrate.mjs', '--prueba']),
  paso('db-seed', 'Semilla', ['scripts/db-seed.mjs']),
  ...(keycloakInstalado
    ? []
    : [
        paso('keycloak-install', 'Instalar Keycloak local', [
          'scripts/keycloak-dev.mjs',
          'install',
          '--si',
        ]),
      ]),
  paso('keycloak-realm', 'Realm priora', ['scripts/keycloak-realm.mjs']),
];

export const procesosDev = ({ plataforma }) => {
  const shell = plataforma === 'win32';
  const proceso = (nombre, paquete, orden) => ({
    nombre,
    comando: 'pnpm',
    args: ['--filter', paquete, orden],
    shell,
  });
  return {
    compilar: {
      comando: 'pnpm',
      args: ['--filter', '@priora/api', '--filter', '@priora/worker', 'build'],
    },
    procesos: [
      proceso('api', '@priora/api', 'start'),
      proceso('worker', '@priora/worker', 'start'),
      proceso('web', '@priora/web', 'dev'),
    ],
  };
};

export const evaluarPrevios = ({ postgresListo, keycloakListo }) => ({
  errores: postgresListo
    ? []
    : ['PostgreSQL no responde: arráncalo y ejecuta pnpm bootstrap (db:init crea roles y bases).'],
  avisos: keycloakListo
    ? []
    : ['Keycloak no está en marcha; si lo necesitas, ejecuta pnpm keycloak:start (usa ~768 MB).'],
});

const aMb = (kib) => kib / 1024;

export const parsearPs = (texto) =>
  texto
    .split(/\r?\n/)
    .map((linea) => /^\s*(\d+)\s+(\S.*?)\s*$/.exec(linea))
    .filter(Boolean)
    .map(([, rss, comando]) => ({
      nombre: comando.split(/[\\/]/).pop(),
      mb: aMb(Number(rss)),
    }));

export const parsearTasklist = (texto) =>
  texto
    .split(/\r?\n/)
    .map((linea) => [...linea.matchAll(/"([^"]*)"/g)].map((m) => m[1]))
    .filter((campos) => campos.length >= 5 && /\d/.test(campos[4]))
    .map((campos) => ({ nombre: campos[0], mb: aMb(Number(campos[4].replace(/\D/g, ''))) }));

export const resumirRam = (procesos) => {
  const crudo = { node: 0, java: 0, postgres: 0, otros: 0 };
  for (const { nombre, mb } of procesos) {
    const base = nombre.toLowerCase().replace(/\.exe$/, '');
    crudo[base in crudo && base !== 'otros' ? base : 'otros'] += mb;
  }
  const grupos = Object.fromEntries(Object.entries(crudo).map(([k, v]) => [k, Math.round(v)]));
  return { grupos, totalMb: Math.round(Object.values(crudo).reduce((a, b) => a + b, 0)) };
};
