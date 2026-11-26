// Se ejecuta con `pnpm db:generate` desde la raíz. Sin importar drizzle-kit: defineConfig solo
// tipa el objeto, y esta carpeta no tiene node_modules propio.
export default {
  dialect: 'postgresql',
  schema: './infra/db/schema.ts',
  out: './infra/db/migrations',
  dbCredentials: { url: process.env.DATABASE_URL_MIGRATOR ?? '' },
};
