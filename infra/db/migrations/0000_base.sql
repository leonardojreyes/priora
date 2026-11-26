-- Migración base (la "0001" de la spec: drizzle-kit numera desde 0000). Sin tablas de negocio.
-- Nadie fuera del dueño obtiene acceso al esquema público por defecto; el acceso del rol de
-- aplicación lo otorga `pnpm db:migrate` (privilegios por defecto del migrador), sin CREATE.
REVOKE ALL ON SCHEMA public FROM PUBLIC;
