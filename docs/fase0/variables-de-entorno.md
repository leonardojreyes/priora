# Variables de entorno

Toda la configuración de Priora entra por variables de entorno (ADR-0020 §4): ningún código de `apps/` ni de `modules/` lee rutas locales ni `.local/`. Así el mismo código corre en un contenedor cambiando solo los valores.

- `.env.example` se versiona y no contiene secretos.
- En desarrollo, `pnpm db:init` crea `.env.local` (permisos 0600, no versionado) con las URLs por rol; `pnpm keycloak:realm` agrega las claves de Keycloak.
- Una prueba (`pnpm test`) falla si una variable de `.env.example` no está en este documento, o viceversa.

## Aplicación

| Variable     | Valor por defecto       | Para qué sirve                                          |
| ------------ | ----------------------- | ------------------------------------------------------- |
| `API_PORT`   | `3001`                  | Puerto de la API NestJS                                 |
| `WEB_PORT`   | `3000`                  | Puerto de la web Next.js                                |
| `WEB_ORIGIN` | `http://localhost:3000` | Origen permitido por CORS y base de las redirecciones   |
| `LOG_LEVEL`  | `info`                  | Nivel de registro (`debug`, `info`, `warn`, `error`)    |

## PostgreSQL

| Variable                | Valor por defecto | Para qué sirve                                                                     |
| ----------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| `PGHOST`                | `127.0.0.1`       | Servidor usado por `db:init` y los scripts                                         |
| `PGPORT`                | `5432`            | Puerto del servidor                                                                |
| `DATABASE_URL_MIGRATOR` | vacío (`db:init`) | Rol `priora_migrator`, dueño del esquema. Solo migraciones; la aplicación no lo usa |
| `DATABASE_URL_APP`      | vacío (`db:init`) | Rol `priora_app`, sin BYPASSRLS. Único rol que usan API y worker                   |
| `DATABASE_URL_TEST`     | vacío (`db:init`) | Base `priora_test` para pruebas de integración                                     |

`db:init` también usa `PGUSER` y `PGPASSWORD` (opcionales) para conectarse como superusuario; no se guardan en archivos.

## Identidad (Keycloak)

| Variable                  | Valor por defecto                        | Para qué sirve                                              |
| ------------------------- | ---------------------------------------- | ----------------------------------------------------------- |
| `KEYCLOAK_PORT`           | `8180`                                   | Puerto local; distinto del 8080 de sig-iso para no chocar   |
| `OIDC_ISSUER_URL`         | `http://127.0.0.1:8180/realms/priora`    | Emisor OIDC; la API valida tokens contra él                 |
| `OIDC_CLIENT_ID`          | `priora-web`                             | Cliente OIDC de la web                                      |
| `OIDC_CLIENT_SECRET`      | vacío (`keycloak:realm`)                 | Secreto del cliente; solo en `.env.local`                   |
| `KEYCLOAK_ADMIN_USER`     | `admin`                                  | Administrador local de Keycloak                             |
| `KEYCLOAK_ADMIN_PASSWORD` | vacío (`keycloak:realm`)                 | Contraseña del administrador; solo en `.env.local`          |

## Reglas

- Las variables sensibles (`*_PASSWORD`, `*_SECRET`) van vacías en `.env.example`.
- Las URLs de base de datos generadas por `db:init` llevan la clave del rol; por eso viven solo en `.env.local`.
- Si agregas una variable: ponla en `.env.example` y en este documento en el mismo cambio.
