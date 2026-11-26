# Paso 0.2 · Repositorio y esqueleto

**Fuente:** `FASE0.md` §0.2. **Rama:** `fase0/0.2`. **ADR aplicables:** 0001, 0003, 0006, 0008, 0011, 0013, 0020.
**Objetivo:** monorepo que compila, prueba y levanta con `pnpm bootstrap && pnpm dev`, sin Docker.
**Criterio de salida:** en macOS y Windows, la web responde en `http://localhost:3000` y `/health` responde; `pnpm build`, `pnpm test` y `pnpm lint` en verde; una importación prohibida hace fallar `pnpm lint:arch`.

**Desviaciones de `FASE0.md` §0.2 (cubiertas por ADR-0020):** no hay `compose.yaml` ni Mailpit; PostgreSQL es el local y Keycloak vive en `.local/`. El realm se llama `infra/keycloak/realm-priora.plantilla.json` (no `realm-priora.json`) porque el script de realm sustituye variables (secretos, URLs) y escribe el resultado, sin versionar, en `.local/realm/`.

## Plan técnico

### 1. Verificación de versiones (primera tarea)
Confirmar y fijar: Node 22 LTS (`.nvmrc`, `engines`), pnpm (`packageManager`), NestJS, Next.js, drizzle-orm/drizzle-kit, pg-boss, PostgreSQL 16.x, Keycloak (referencia sig-iso: 26.8.2) y su JRE. Registrar en la guía de ejecución con licencias.

### 2. Archivos a crear
**Raíz:** `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.nvmrc`, `.editorconfig`, `.env.example`, `.dependency-cruiser.cjs`, `tsconfig.base.json`, `eslint.config.mjs`, `.prettierrc.json`. `.gitignore` agrega `.local/` y `.env.local` (ya cubierto por `.env.*`). Revisar `.gitattributes`.

**Aplicaciones**
- `apps/api` (NestJS): `GET /health`; OpenAPI con `@nestjs/swagger` en `/api/docs`; prefijo `/api/v1` para negocio.
- `apps/worker`: pg-boss con trabajo `ping` que registra una línea y lleva `tenant_id` ficticio en el payload (ADR-0008). Arranca con `migrate:false` y `createSchema:false`.
- `apps/web` (Next.js): página "Priora" con la lista de módulos, sin nombres de la plantilla bancaria.

**Paquetes:** `packages/workflow-engine` (vacío, una prueba, umbral de cobertura 90% desde ya), `packages/contracts` (`openapi.json` real generado desde la API, script `contracts:generate`, cliente generado mínimo, comprobación de deriva), `packages/ui` (vacío), `packages/config` (ESLint, TS y Prettier compartidos).

**Módulo de ejemplo:** `modules/ejemplo/{domain,application,infrastructure,interface}`, sin tablas. `expectTenantIsolation` no aplica hasta 0.6 (primeras tablas con `tenant_id`).

**Scripts Node** (`scripts/`, adaptados de sig-iso, multiplataforma): `db-init.mjs` + `lib/db-init.mjs`, `db-migrate.ts` (drizzle-kit + esquema `pgboss` con el rol migrador), `db-seed.ts` (vacío), `bootstrap.mjs`, `dev.mjs`, `keycloak-dev.mjs` + `lib/`, `keycloak-realm.ts`, `validar-plantillas.mjs`, `ram-report.mjs`, `verificar-esqueleto.ts`. Nunca `setup` (nombre reservado de pnpm).

**Infra:** `infra/keycloak/realm-priora.plantilla.json` (sin usuarios; llegan en 0.6).

### 3. Datos y migraciones
- `pnpm db:init` (idempotente, superusuario local): bases `priora` y `priora_test`; roles `priora_migrator` (dueño), `priora_app` (NOBYPASSRLS) y `priora_test`; extensión `pg_trgm`. Escribe `DATABASE_URL_MIGRATOR`, `DATABASE_URL_APP` y `DATABASE_URL_TEST` en `.env.local` (0600). **Sin ningún `DROP`** y solo sobre objetos `priora*`; no toca `orbyta` ni `sigiso`.
- Migración 0001 mínima con Drizzle. Sin tablas de negocio.
- `db:migrate` crea el esquema `pgboss` con el rol migrador y otorga `USAGE` y privilegios (incluidos los por defecto) a `priora_app`.
- `db:reset` (con confirmación) solo actúa sobre `priora*`.

### 4. Contratos
`GET /health` → `{ status, version, db }`. El OpenAPI se genera desde el código y se versiona; no hay contrato manual (ADR-0011).

### 5. Configuración por entorno (ADR-0020 §4)
Variables: `DATABASE_URL_APP`, `DATABASE_URL_MIGRATOR`, `DATABASE_URL_TEST`, `OIDC_ISSUER_URL`, `KEYCLOAK_PORT`, `API_PORT`, `WEB_PORT`. `apps/` y `modules/` no referencian `.local/`; solo los scripts `keycloak:*`. Una regla (dependency-cruiser o prueba de grep) lo verifica.

### 6. Keycloak y coexistencia con sig-iso
- Descarga con SHA-256 fijado en el repositorio; versiones fijas; licencias anotadas en la guía.
- Puerto propio y configurable (`KEYCLOAK_PORT`; por defecto distinto del 8080 de sig-iso). Con 8 GB no se corren ambos a la vez: la guía lo advierte.
- Windows: `kc.bat`, instalador oficial de PostgreSQL, conexión por el controlador `pg` (sin depender de `psql` en el PATH), `PGUSER`/`PGPASSWORD`.

### 7. Reglas de dependency-cruiser (`lint:arch`)
Prueba con fixtures que cada caso falla:
1. `domain` → NestJS, Drizzle, pg-boss o Next.
2. `packages/workflow-engine` → `apps/` o `modules/`.
3. un módulo → infraestructura de otro módulo (solo se permite su `application` pública).

### 8. `plantillas:validar`
Sintaxis YAML y grafos de flujo: enlaces rotos, nodos inalcanzables, decisiones sin `por_defecto`. Los fixtures de prueba son propios; ningún texto fuera de `plantillas/` usa nombres bancarios. Esquemas zod en las fases 1 y 2.

### 9. Estrategia de pruebas (pruebas primero)
- **Unidad (Vitest):** por paquete y para `scripts/lib` (db-init, keycloak-dev, validar-plantillas), siguiendo las pruebas existentes en sig-iso.
- **Integración:** `db:init` y `db:migrate` contra `priora_test`; el worker encola y procesa `ping`; `/health` con base real.
- **Arquitectura:** los tres casos de `lint:arch`.
- **Humo:** `verificar:esqueleto` consulta `/health` y la web. Playwright llega en 0.4.
- **Aislamiento:** no aplica en 0.2 (sin tablas de negocio); queda para 0.6.

### 10. Documentación a ajustar al implementar
`ARCHITECTURE.md` (§2 sin Mailpit; §6 sin `infra/compose`), `docs/fase0/base-tecnica.md` (P10 y §3 "fijada en Compose"), `FASE0.md` §0.2 (nota de desviación), `README.md` (requisitos nativos, sin Docker), `.claude/settings.json` (quitar permisos de `docker compose`; permitir `pnpm db:*` y `pnpm keycloak:*`), nueva `docs/fase0/guia-de-ejecucion.md` y `docs/fase0/variables-de-entorno.md`. `CLAUDE.md` y los ADR 0012/0020 ya están al día.

### 11. Riesgos
| Riesgo | Mitigación |
| --- | --- |
| RAM de 8 GB | `ram-report` en el reporte; Keycloak solo cuando se necesita |
| No hay Java instalado | `keycloak:install` descarga un JRE a `.local/` con checksum |
| Permisos de `priora_app` sobre `pgboss` | GRANT y privilegios por defecto en `db:migrate`, con prueba de integración |
| Divergencia nativo/contenedor (futuro) | configuración solo por entorno (§5), probada en la fase 4 |
| Windows sin probar | prueba manual del responsable o CI en 0.4 |
| Colisión con sig-iso | puerto distinto, prefijo `priora_`, sin `DROP` |

### 12. Alternativas descartadas
Nx; Compose y Dev Container en desarrollo; PostgreSQL embebido (la RLS exige PostgreSQL real); OpenAPI manual.

### 13. Tareas sugeridas para `/tasks`
1. Versiones y raíz del monorepo (pnpm, Turborepo, config compartida). 2. `db:init` y `db:migrate` con pruebas. 3. API con `/health` y OpenAPI. 4. Contratos generados. 5. Worker con pg-boss. 6. Web. 7. `modules/ejemplo` y `lint:arch` con sus fixtures. 8. `plantillas:validar`. 9. Keycloak local y realm. 10. `bootstrap`, `dev`, `verificar:esqueleto`, `ram-report`. 11. Documentación y reporte.

### Revisión
`arquitecto`: aprobado con cambios, todos incorporados; no requiere ADR nuevo. `revisor-cumplimiento`: no se consultó, porque el paso no maneja datos personales (usuarios y bitácora llegan en 0.6).

## Tareas

Cada tarea es una sesión de `/implement`, deja el repositorio en verde y se verifica con su comando. `Dep.` indica las tareas que deben estar hechas antes. Las pruebas se escriben primero. Al terminar cada una, `pnpm lint` y `pnpm typecheck` siguen en verde.

**Bloque A · Base y contratos**
- [x] **T1** · Raíz del monorepo y `packages/config` (pnpm workspaces, Turborepo, versiones fijadas, `.nvmrc`, `.editorconfig`, ESLint, TS y Prettier compartidos, `.gitignore` con `.local/`) · `pnpm install`, `pnpm lint`, `pnpm typecheck` y `pnpm build` terminan sin error con los paquetes vacíos · `pnpm install && pnpm lint && pnpm typecheck && pnpm build` · Dep.: ninguna.
- [x] **T2** · Variables de entorno: `.env.example` y `docs/fase0/variables-de-entorno.md`, más una prueba que falla si falta una variable documentada · la prueba pasa y el `.env.example` no contiene secretos · `pnpm test -- variables-entorno` · Dep.: T1.
- [x] **T3** · `packages/workflow-engine` vacío con una prueba y umbral de cobertura del 90% · la prueba pasa y la cobertura se exige · `pnpm --filter @priora/workflow-engine test:coverage` · Dep.: T1.

**Bloque B · Dominio y límites de arquitectura**
- [x] **T4** · `modules/ejemplo` con las cuatro capas, una entidad de dominio con prueba, y `.dependency-cruiser.cjs` con fixtures de los tres casos prohibidos (dominio→infraestructura/NestJS/Drizzle/pg-boss/Next; `workflow-engine`→`apps/` o `modules/`; módulo→infraestructura de otro módulo) y la regla "ningún código de `apps/` ni `modules/` referencia `.local/`" · el código real pasa `lint:arch` y cada fixture lo hace fallar · `pnpm lint:arch && pnpm test -- arquitectura` · Dep.: T1.
- [x] **T5** · `pnpm plantillas:validar <carpeta>` (YAML, enlaces rotos, nodos inalcanzables, decisiones sin `por_defecto`) con fixtures propios · pasa sobre `plantillas/marco-tic-banca` y `plantillas/generica-simple`, y falla con cada fixture defectuoso · `pnpm test -- validar-plantillas && pnpm plantillas:validar plantillas/marco-tic-banca` · Dep.: T1.

**Bloque C · Base de datos**
- [x] **T6** · `pnpm db:init` (lib y script adaptados de sig-iso): bases `priora` y `priora_test`, roles `priora_migrator`, `priora_app` (NOBYPASSRLS) y `priora_test`, `pg_trgm`, URLs en `.env.local` con permisos 0600; idempotente y sin `DROP` · pruebas de unidad con administrador simulado e integración sobre PostgreSQL local; una segunda ejecución no cambia nada y `orbyta` y `sigiso` quedan intactas · `pnpm test -- db-init && pnpm db:init && pnpm db:init` · Dep.: T2.
- [x] **T7** · `pnpm db:migrate`: drizzle-kit con migración 0001 mínima, esquema `pgboss` creado por el rol migrador y `GRANT` con privilegios por defecto para `priora_app`; `db:seed` vacío; `db:reset` con confirmación y solo sobre `priora*` · prueba de integración: `priora_app` opera sobre `pgboss` y no puede crear tablas ni saltar RLS · `pnpm db:migrate && pnpm test:integration -- db-migrate` · Dep.: T6.

**Bloque D · API, contratos y worker**
- [ ] **T8** · `apps/api` (NestJS): `GET /health` → `{ status, version, db }`, OpenAPI en `/api/docs`, prefijo `/api/v1`, conexión como `priora_app` · prueba de integración con base real: `/health` responde 200 con `db: up` y 503 con `db: down` · `pnpm --filter @priora/api test` · Dep.: T1, T7.
- [ ] **T9** · `packages/contracts`: `openapi.json` generado desde la API, `contracts:generate`, cliente mínimo y comprobación de deriva · `contracts:check` falla si el contrato versionado difiere del generado · `pnpm contracts:generate && pnpm contracts:check` · Dep.: T8.
- [ ] **T10** · `apps/worker`: pg-boss con `migrate:false` y `createSchema:false`, trabajo `ping` con `tenant_id` ficticio en el payload · prueba de integración: se encola, se procesa y deja una línea de registro · `pnpm --filter @priora/worker test` · Dep.: T7.

**Bloque E · Interfaz e identidad**
- [ ] **T11** · `apps/web` (Next.js) con la página "Priora" y la lista de módulos, y `packages/ui` vacío · prueba de componente de la página y `next build` sin errores; ningún nombre de la plantilla bancaria en la interfaz · `pnpm --filter @priora/web test && pnpm --filter @priora/web build` · Dep.: T1.
- [ ] **T12** · Keycloak local: `keycloak:install` (descarga con SHA-256 fijado, JRE en `.local/`), `start|stop|status|reset`, `keycloak:realm` desde `infra/keycloak/realm-priora.plantilla.json`; puerto configurable distinto del de sig-iso; rutas de Windows (`kc.bat`) · pruebas de unidad de las funciones puras (checksum, plan de descarga, argumentos de arranque, plantilla del realm) · `pnpm test -- keycloak` y, manualmente, `pnpm keycloak:install && pnpm keycloak:realm && pnpm keycloak:start && pnpm keycloak:status` · Dep.: T2.

**Bloque F · Integración de punta a punta**
- [ ] **T13** · `pnpm bootstrap`, `pnpm dev` (api + worker + web, comprobando PostgreSQL y Keycloak) y `pnpm ram-report` · `bootstrap` es idempotente y `dev` levanta los tres procesos y los apaga con Ctrl+C · `pnpm bootstrap && pnpm dev` (en otra terminal, `pnpm ram-report`) · Dep.: T7, T8, T10, T11, T12.
- [ ] **T14** · `pnpm verificar:esqueleto` (consulta `/health` y la web) · imprime verde con `dev` corriendo; falla con un mensaje claro si algo no responde · `pnpm verificar:esqueleto` · Dep.: T13.

**Bloque G · Cierre**
- [ ] **T15** · Documentación y permisos: `ARCHITECTURE.md` (§2 y §6), `docs/fase0/base-tecnica.md` (P10 y §3), nota de desviación en `FASE0.md` §0.2, `README.md`, `.claude/settings.json` (quitar `docker compose`; permitir `pnpm db:*` y `pnpm keycloak:*`), `docs/fase0/guia-de-ejecucion.md`, estado y `TODO.md` · todos los enlaces resuelven, y `pnpm build && pnpm test && pnpm lint && pnpm lint:arch` en verde · `pnpm build && pnpm test && pnpm lint && pnpm lint:arch` · Dep.: T1 a T14.

**Orden sugerido:** T1 → T2, T3, T4, T5 (en cualquier orden) → T6 → T7 → T8 → T9, T10 → T11, T12 → T13 → T14 → T15. T3, T4, T5 y T11 solo dependen de T1 y pueden adelantarse si una sesión queda corta.

**Nota de verificación:** la prueba en Windows no puede hacerla el asistente en este equipo. T12 y T13 se validan allí cuando el responsable o la CI de 0.4 la ejecuten.
