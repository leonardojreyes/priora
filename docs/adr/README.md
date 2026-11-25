# Registro de decisiones de arquitectura (ADR)

Todos nacieron en estado **Propuesto**; el 2026-11-25 los 19 pasaron a **Aceptado** (paso 0.1). Un ADR aceptado no se edita: se reemplaza por otro que lo declare *Reemplazado por ADR-XXXX*.

| ADR | Título | Estado |
| --- | --- | --- |
| [0001](0001-estilo-monolito-modular-hexagonal.md) | Estilo: monolito modular con arquitectura hexagonal | Aceptado (2026-11-25) |
| [0002](0002-backend-typescript-nestjs.md) | Backend en TypeScript con NestJS | Aceptado (2026-11-25) |
| [0003](0003-monorepo-pnpm-turborepo.md) | Monorepo con pnpm workspaces y Turborepo | Aceptado (2026-11-25) |
| [0004](0004-motor-de-flujos-propio.md) | Motor de flujos propio y declarativo | Aceptado (2026-11-25) |
| [0005](0005-web-nextjs.md) | Web con Next.js, Tailwind y shadcn/ui | Aceptado (2026-11-25) |
| [0006](0006-postgresql-rls-drizzle.md) | PostgreSQL con RLS y Drizzle ORM | Aceptado (2026-11-25) |
| [0007](0007-identidad-keycloak-autorizacion.md) | Identidad con Keycloak; autorización en dos capas | Aceptado (2026-11-25) |
| [0008](0008-trabajos-eventos-pgboss.md) | Trabajos programados y eventos sobre PostgreSQL | Aceptado (2026-11-25) |
| [0009](0009-almacenamiento-archivos.md) | Almacenamiento de archivos por puerto | Aceptado (2026-11-25) |
| [0010](0010-reglas-jsonlogic.md) | Reglas configurables con JSONLogic | Aceptado (2026-11-25) |
| [0011](0011-contratos-openapi.md) | Contrato primero con OpenAPI 3.1 | Aceptado (2026-11-25) |
| [0012](0012-entorno-desarrollo.md) | Entorno de desarrollo liviano | Aceptado (2026-11-25) |
| [0013](0013-calidad-ci.md) | Calidad y CI en GitHub Actions | Aceptado (2026-11-25) |
| [0014](0014-observabilidad.md) | Observabilidad con OpenTelemetry | Aceptado (2026-11-25) |
| [0015](0015-despliegue.md) | Despliegue: Compose para piloto, Kubernetes para producción | Aceptado (2026-11-25) |
| [0016](0016-ia-puerto.md) | IA: puerto definido, implementación diferida | Aceptado (2026-11-25) |
| [0017](0017-sistema-de-diseno.md) | Sistema de diseño liviano | Aceptado (2026-11-25) |
| [0018](0018-documentos-pdf-excel.md) | Generación de PDF y Excel | Aceptado (2026-11-25) |
| [0019](0019-pruebas.md) | Estrategia de pruebas | Aceptado (2026-11-25) |
| [0020](0020-desarrollo-nativo-sin-docker.md) | Desarrollo nativo sin Docker (reemplaza parcialmente a 0012) | Aceptado (2026-11-25) |

Plantilla para nuevos ADR: usar el comando `/adr <título>`.
