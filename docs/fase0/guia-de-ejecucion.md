# Guía de ejecución (desarrollo)

Cómo levantar y comprobar Priora en una máquina de desarrollo, sin Docker (ADR-0020). Variables: [variables-de-entorno.md](variables-de-entorno.md). Estado vivo: [estado.md](estado.md).

## Requisitos

- Node.js 22 LTS (`.nvmrc`), pnpm 12.8.1 (`packageManager`) y Git.
- PostgreSQL 16.x local con un usuario que pueda crear roles y bases (probado con 16.15). No se tocan otras bases del servidor.
- 8 GB de RAM como mínimo (ver `pnpm ram-report`).
- macOS probado; Windows pendiente de validar (la CI del paso 0.4 o el responsable).

## Primera vez

```
pnpm install
pnpm bootstrap
pnpm dev
```

`pnpm bootstrap` es idempotente y ejecuta, en orden: `db:init` (roles `priora_migrator`, `priora_app`, `priora_test`; bases `priora` y `priora_test`; `.env.local`), `db:migrate` en ambas bases, `db:seed`, instalación de Keycloak si falta y generación del realm. `pnpm dev` comprueba PostgreSQL (error si no responde) y Keycloak (solo aviso), compila API y worker y levanta API, worker y web; Ctrl+C los apaga a todos.

| Servicio | URL |
| --- | --- |
| Web | http://localhost:3000 |
| API (`/health`) | http://localhost:3001/health |
| OpenAPI | http://localhost:3001/api/docs |
| Keycloak | http://127.0.0.1:8180 (solo si se inicia) |

## Comprobar que funciona

```
pnpm verificar:esqueleto   # /health (200, db: up) y la web (200); sale con 1 si falla
pnpm build && pnpm test && pnpm lint && pnpm lint:arch
pnpm ram-report            # consumo de node, java y postgres
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm db:init` | Crea roles, bases y `.env.local`; nunca borra |
| `pnpm db:migrate` (`-- --prueba`) | Aplica migraciones a `priora` (o `priora_test`) y crea el esquema `pgboss` |
| `pnpm db:generate` | Genera una migración nueva con drizzle-kit |
| `pnpm db:seed` | Semilla (vacía hasta el paso 0.6) |
| `pnpm db:reset` | Recrea la base de desarrollo; pide confirmación (`--si` la omite) |
| `pnpm keycloak:install`, `pnpm keycloak:start`, `pnpm keycloak:stop`, `pnpm keycloak:status`, `pnpm keycloak:reset` | Ciclo de vida de Keycloak local |
| `pnpm keycloak:realm` | Genera el realm `priora` desde `infra/keycloak/realm-priora.plantilla.json` |
| `pnpm contracts:generate` / `contracts:check` | Genera OpenAPI y cliente; la comprobación falla ante deriva |
| `pnpm plantillas:validar <carpeta>` | Valida YAML y grafos de flujo de una plantilla |
| `pnpm test:integration` | Pruebas que usan PostgreSQL (`priora_test`) |

## Versiones fijadas

| Pieza | Versión | Licencia |
| --- | --- | --- |
| NestJS | 12.6.2 | MIT |
| Next.js · React · next-intl | 16.4.6 · 19.3.1 · 4.16.2 | MIT |
| pg-boss | 12.39.0 | MIT |
| drizzle-orm · drizzle-kit | 0.45.x · 0.31.x | Apache-2.0 · MIT |
| orval | 8.49.0 | MIT |
| dependency-cruiser | 18.9.0 | MIT |
| Vitest | 5.1.2 | MIT |
| Keycloak | 26.8.2 | Apache-2.0 |
| JRE Temurin | 21.0.13+9 | GPLv2 + Classpath Exception |

El JRE se descarga y se ejecuta como programa externo (no se enlaza ni se distribuye con el producto); su licencia se revisa en el paso 0.4.

## Problemas frecuentes

- **`pnpm dev` dice que PostgreSQL no responde:** inicia el servicio local (`brew services start postgresql@16` en macOS) y revisa `PGHOST` y `PGPORT`.
- **`/health` responde 503 con `db: down`:** `DATABASE_URL_APP` falta o es incorrecta; ejecuta `pnpm bootstrap` otra vez.
- **Puerto ocupado:** cambia `API_PORT`, `WEB_PORT` o `KEYCLOAK_PORT` en `.env.local`. Si sig-iso tiene Keycloak en 8080 conviene detenerlo por la RAM.
- **Cambió el contrato de la API:** `pnpm contracts:generate` y confirma el resultado.
- **Empezar de cero:** `pnpm db:reset` y `pnpm keycloak:reset`.
