import { PgBoss } from 'pg-boss';

/**
 * El worker corre como `priora_app` (sin BYPASSRLS y sin CREATE): el esquema `pgboss` lo crea y
 * migra `pnpm db:migrate` con el rol migrador, nunca el worker.
 */
export const opcionesBoss = (databaseUrl: string) => ({
  connectionString: databaseUrl,
  schema: 'pgboss',
  migrate: false,
  createSchema: false,
});

export const crearBoss = (databaseUrl: string): PgBoss => new PgBoss(opcionesBoss(databaseUrl));
