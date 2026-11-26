/** Reglas de arquitectura (ADR-0003). Las rutas son relativas al directorio de análisis. */
const MOTOR_DE_FRAMEWORK = '(^|node_modules/)(@nestjs/|drizzle-orm|pg-boss|next(/|$))';

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-sin-infraestructura',
      severity: 'error',
      comment: 'domain/ no importa NestJS, Drizzle, pg-boss, Next ni otras capas del módulo.',
      from: { path: '^modules/[^/]+/domain/' },
      to: {
        path: [MOTOR_DE_FRAMEWORK, '^modules/[^/]+/(application|infrastructure|interface)/'],
      },
    },
    {
      name: 'workflow-engine-aislado',
      severity: 'error',
      comment: 'workflow-engine es TypeScript puro: no importa apps/ ni modules/.',
      from: { path: '^packages/workflow-engine/' },
      to: { path: '^(apps|modules)/' },
    },
    {
      name: 'modulos-solo-via-application',
      severity: 'error',
      comment: 'Un módulo solo puede usar el application/ público de otro módulo.',
      from: { path: '^modules/([^/]+)/' },
      to: {
        path: '^modules/[^/]+/(domain|infrastructure|interface)/',
        pathNot: '^modules/$1/',
      },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      extensions: ['.ts', '.js', '.mjs'],
    },
  },
};
