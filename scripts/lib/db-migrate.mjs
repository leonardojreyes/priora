// Lógica de `pnpm db:migrate`: migraciones de drizzle, esquema de pg-boss y privilegios del rol de aplicación.
// Se ejecuta con el rol migrador (dueño de la base). El rol de aplicación nunca recibe CREATE.
import { join } from 'node:path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import { getConstructionPlans } from 'pg-boss';

export const rutaMigraciones = join(import.meta.dirname, '..', '..', 'infra', 'db', 'migrations');

const ESQUEMA_PGBOSS = 'pgboss';

const instalarPgBoss = async (cliente) => {
  const { rows } = await cliente.query("select to_regclass('pgboss.version') as tabla");
  if (rows[0].tabla) return false;
  await cliente.query(getConstructionPlans(ESQUEMA_PGBOSS));
  return true;
};

const otorgarPrivilegios = async (cliente, rolApp) => {
  const id = (nombre) => cliente.escapeIdentifier(nombre);
  const { rows } = await cliente.query('select current_user as migrador');
  const migrador = rows[0].migrador;
  for (const esquema of ['public', ESQUEMA_PGBOSS]) {
    await cliente.query(`GRANT USAGE ON SCHEMA ${id(esquema)} TO ${id(rolApp)}`);
    await cliente.query(
      `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ${id(esquema)} TO ${id(rolApp)}`,
    );
    await cliente.query(
      `GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ${id(esquema)} TO ${id(rolApp)}`,
    );
    await cliente.query(
      `ALTER DEFAULT PRIVILEGES FOR ROLE ${id(migrador)} IN SCHEMA ${id(esquema)} ` +
        `GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${id(rolApp)}`,
    );
    await cliente.query(
      `ALTER DEFAULT PRIVILEGES FOR ROLE ${id(migrador)} IN SCHEMA ${id(esquema)} ` +
        `GRANT USAGE, SELECT ON SEQUENCES TO ${id(rolApp)}`,
    );
  }
};

/** Migra la base de `urlMigrador` y deja a `rolApp` operando sin poder crear objetos. Idempotente. */
export const migrar = async ({ urlMigrador, rolApp, carpeta = rutaMigraciones }) => {
  const cliente = new pg.Client({ connectionString: urlMigrador });
  await cliente.connect();
  try {
    await migrate(drizzle(cliente), { migrationsFolder: carpeta });
    const pgbossCreado = await instalarPgBoss(cliente);
    await otorgarPrivilegios(cliente, rolApp);
    return { pgbossCreado };
  } finally {
    await cliente.end();
  }
};
