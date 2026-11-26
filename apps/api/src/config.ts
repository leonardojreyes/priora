export interface ApiConfig {
  port: number;
  databaseUrl: string;
}

/** Configuración solo por variables de entorno (ADR-0020 §4). */
export const cargarConfig = (env: Record<string, string | undefined>): ApiConfig => {
  const databaseUrl = env.DATABASE_URL_APP;
  if (!databaseUrl) throw new Error('Falta la variable DATABASE_URL_APP');

  const port = env.API_PORT === undefined || env.API_PORT === '' ? 3001 : Number(env.API_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`API_PORT no es un puerto válido: "${env.API_PORT}"`);
  }
  return { port, databaseUrl };
};
