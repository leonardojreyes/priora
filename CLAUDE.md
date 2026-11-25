# Priora

Sistema multiempresa de **gestión de la demanda de requerimientos y proyectos de TI**: entrada única, clasificación, priorización contra capacidad, decisiones colegiadas con acta, ejecución trazable e indicadores. Todo lo que cambia entre empresas es **configuración versionada** (plantillas), no código. Producto de SynapTech.

## Antes de hacer cualquier cosa

1. Lee `docs/fase0/estado.md` (dónde estamos, decisiones, pendientes) y la siguiente casilla vacía de `TODO.md`.
2. Lee **solo** los documentos que nombra la fase o el paso en curso. No leas `docs/referencia/` completo: abre la sección que necesites.
3. Si vas a proponer un cambio de arquitectura, lee el ADR correspondiente en `docs/adr/`.

## Mapa

| Ruta | Qué es |
| --- | --- |
| `PRD.md` | Qué y por qué: usuarios, alcance, flujos, pantallas, reglas clave |
| `ARCHITECTURE.md` | Mapa técnico: contenedores, módulos, modelo de datos, carpetas |
| `TODO.md` | Backlog por fase con casillas; la siguiente casilla vacía es el siguiente trabajo |
| `FASE0.md` | Prompt de arranque y hoja de ruta (fases 0 a 9) |
| `docs/fase0/base-tecnica.md` | Principios, stack, licencias, multiempresa, look and feel |
| `docs/fase0/estado.md` | Estado vivo del proyecto |
| `docs/fases/` | Una ficha por fase con historias y criterios de aceptación |
| `docs/specs/` | Specs del producto (dominio, motor, parametrización, instrumentos, triage, priorización, plazos, seguridad) |
| `docs/specs/features/` | Specs por funcionalidad generadas con `/spec` |
| `docs/adr/` | Decisiones de arquitectura |
| `docs/referencia/` | Marco metodológico de origen (banco) y BPMN: fuente funcional, no se copia al producto |
| `plantillas/` | Configuración de empresas: `marco-tic-banca`, `generica-simple` |
| `apps/api` · `apps/worker` · `apps/web` | NestJS · pg-boss · Next.js |
| `modules/<modulo>/{domain,application,infrastructure,interface}` | Módulos de negocio (hexagonal) |
| `packages/workflow-engine` | Motor de flujos, TypeScript puro |
| `packages/contracts` | OpenAPI, cliente generado, esquemas de plantillas |
| `packages/ui` | Tokens y componentes |
| `infra/` | Compose, realm de Keycloak, (fase 8) Helm y OpenTofu |

## Comandos (se completan en el paso 0.2)

```
pnpm bootstrap            # db:init (.env.local), migraciones, semilla, Keycloak local (ADR-0020)
pnpm dev              # api + worker + web
pnpm test             # Vitest
pnpm test:e2e         # Playwright
pnpm lint             # ESLint + Prettier + dependency-cruiser
pnpm typecheck
pnpm plantillas:validar plantillas/marco-tic-banca
pnpm db:generate      # nueva migración (drizzle-kit)
pnpm db:migrate       # aplicar migraciones
```

## Reglas no negociables

- **Configuración antes que código.** Nunca escribas en código nombres de la plantilla bancaria ("Mesa de Demanda", "VPEG", "Medios Tecnológicos", "Cumplimiento"). Consulta flags, claves y reglas de la configuración. Si algo no se puede expresar en configuración, primero amplía la spec y el esquema.
- **Multiempresa.** Toda tabla de negocio con `tenant_id` y RLS; todo módulo con su prueba de aislamiento (`expectTenantIsolation`). Nunca uses un rol con BYPASSRLS desde la aplicación.
- **Hexagonal.** `domain/` no importa NestJS, Drizzle, pg-boss ni nada de infraestructura. `packages/workflow-engine` no importa nada de `apps/` ni `modules/`.
- **Bitácora.** Todo cambio de negocio o de configuración emite un evento inmutable.
- **Definiciones versionadas.** Publicar una versión nunca altera ítems en curso.
- **Pruebas primero** en `/implement`. El motor exige ≥ 90% de cobertura.
- **Español de Ecuador** en la interfaz, textos con next-intl. Código y nombres técnicos en inglés salvo términos del dominio (ver `docs/specs/dominio.md` §2).
- **Windows y macOS.** Scripts en Node; nada de bash en `package.json`.
- **Liviano.** Cero contenedores en desarrollo: PostgreSQL local y Keycloak en `.local/` (ADR-0020); Compose solo para despliegue. Configuración solo por variables de entorno. Nada nuevo sin ADR.
- **Git.** Nunca commits a `main`; rama por paso o historia; PR con controles en verde.
- **Secretos.** Nunca en el repositorio; `.env.example` documenta las variables.
- **Licencias.** MIT, Apache 2.0, BSD o MPL. Otra licencia requiere ADR de excepción. bpmn-js no se usa.

## Flujo de trabajo por funcionalidad

`/spec <historia>` → `/plan` (modo plan, sin editar) → `/tasks` → `/implement <tarea>` (una por sesión) → `/review` → PR. Otros: `/estado` (reanudar), `/fase N` (iniciar fase), `/diagnosticar <error>` (causa raíz sin editar), `/adr <título>`, `/inicio` (solo paso 0.1).

- **Verifica antes de terminar:** toda tarea tiene un comando de verificación (prueba, lint, build) que ejecutas tú; sin verde no está terminada.
- **Error complejo:** primero `/diagnosticar` (solo lectura); se corrige después de aprobar la causa raíz.
- **Contexto limpio:** al cerrar una historia o un bloque grande, deja `TODO.md` y el estado al día y recomienda `/clear`; la sesión siguiente arranca con `/estado`.

## Subagentes

`arquitecto` · `experto-dominio` · `revisor-multiempresa` · `revisor-seguridad` · `revisor-cumplimiento` · `ingeniero-pruebas` · `auditor-accesibilidad` · `documentador`. Ver `.claude/agents/`.

## Cuando termines una tarea

Actualiza `docs/fase0/estado.md` (hecho, decisiones, pendientes, siguiente paso) y `TODO.md` si cerraste una historia, y entrega el reporte con el formato de `FASE0.md` §8. Si cambió la estructura, actualiza `ARCHITECTURE.md`; si cambió el alcance o una regla visible, `PRD.md`.
