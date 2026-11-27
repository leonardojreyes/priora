export interface WorkerConfig {
  databaseUrl: string;
  logLevel: string;
}

/** Configuración solo por variables de entorno (ADR-0020 §4). */
export const cargarConfig = (env: Record<string, string | undefined>): WorkerConfig => {
  const databaseUrl = env.DATABASE_URL_APP;
  if (!databaseUrl) throw new Error('Falta la variable DATABASE_URL_APP');
  return { databaseUrl, logLevel: env.LOG_LEVEL || 'info' };
};
