# Base técnica de Priora

> Estándar SynapTech (skill `fase0-producto-synaptech` v1.0) adaptado a este producto con la opción **Fase 0 ligera**. CLAUDE.md enlaza a este archivo; no repitas su contenido en otros lados. Cada decisión tiene su ADR en `docs/adr/`.

## 1. Decisiones fijas y ajustes de este producto

| Tema | Decisión SynapTech | En Priora |
| --- | --- | --- |
| Infraestructura | On-premise o nube privada, Kubernetes portable | Igual como destino. **Fases 0 a 7: desarrollo nativo sin Docker (ADR-0020), Compose solo para el despliegue del piloto**; Helm/Kubernetes/OpenTofu/Argo CD en la fase 8 (ADR-0015) |
| Identidad | Keycloak autogestionado | Igual (ADR-0007) |
| Código y CI/CD | GitHub + Actions, sin CodeQL | Igual (ADR-0013) |
| Equipos | Windows y macOS | Igual: scripts en Node, `.gitattributes`, hooks en Node. Dev Container **opcional** (ADR-0012) |
| Licencias | Máximo código abierto | Igual (§6) |
| Backend | Se elige al arrancar | **TypeScript + NestJS** (ADR-0002) |
| Nombre de código | Se elige al arrancar | **Priora** (confirmado el 2026-11-25) |
| Mercado | Medianas y grandes del Ecuador; posible banca | Igual. La primera plantilla es bancaria: todo debe resistir due diligence bancaria |
| Canales | Web, móvil, API | **Web responsiva + API**. Móvil fuera del alcance inicial |
| IA | Puerto + gateway | **Puerto definido, sin implementar** hasta la fase 9 (ADR-0016) |

## 2. Principios de arquitectura

| # | Principio | Cómo se hace cumplir |
| --- | --- | --- |
| P1 | Monolito modular primero | Módulos en `modules/`; dependency-cruiser bloquea dependencias prohibidas |
| P2 | Hexagonal: el dominio no conoce frameworks, BD ni proveedores | Reglas de dependency-cruiser + subagente `arquitecto` |
| P3 | Multiempresa desde el día uno, aislamiento en la BD | RLS + prueba de aislamiento obligatoria por módulo |
| P4 | Contrato primero (OpenAPI 3.1) | Cliente generado para la web; CI falla si el contrato cambia sin regenerar |
| P5 | Estándares abiertos antes que productos | ADR obligatorio para dependencias propietarias |
| P6 | Seguro por defecto (OWASP ASVS nivel 2) | Escaneos en cada PR + subagente `revisor-seguridad` |
| P7 | Privacidad por diseño (LOPDP) | Campos `dato_personal` en instrumentos + subagente `revisor-cumplimiento` |
| P8 | IA desacoplada y gobernada | Puerto `AsistenteIA` en el dominio cuando se active |
| P9 | Observable y etiquetado por empresa | OpenTelemetry + logs JSON con `tenant_id` |
| P10 | Todo como código | Compose, migraciones, plantillas y configuración versionadas; Helm/OpenTofu en fase 8 |
| P11 | Decisiones en ADRs que Claude lee antes de proponer cambios | `docs/adr/` + comando `/adr` |
| P12 | Tecnología mayoritaria, con soporte largo | Criterio en cada ADR |
| **P13** | **Configuración antes que código**: todo lo que varía entre empresas es dato | Suite de aceptación con dos plantillas (`docs/specs/parametrizacion.md`) |
| **P14** | **Liviano para una MacBook M1 de 8 GB** | Desarrollo nativo: cero contenedores (PostgreSQL local, Keycloak en `.local/`; ADR-0020) |

## 3. Stack (versiones: la última estable al iniciar el paso 0.2, fijada en `package.json` y en Compose)

| ADR | Tema | Decisión | Licencia |
| --- | --- | --- | --- |
| 0001 | Estilo | Monolito modular + hexagonal (DDD táctico) | — |
| 0002 | Backend | Node.js LTS + TypeScript + NestJS | MIT |
| 0003 | Monorepo | pnpm workspaces + Turborepo + dependency-cruiser | MIT |
| 0004 | Motor de flujos | Propio, declarativo (YAML/JSON), no motor BPMN | — |
| 0005 | Web | Next.js (App Router) + Tailwind + shadcn/ui + TanStack Query + react-hook-form + zod; React Flow + dagre para diagramas | MIT |
| 0006 | Base de datos | PostgreSQL con RLS + Drizzle ORM y drizzle-kit; extensión pg_trgm | PostgreSQL / Apache 2.0 |
| 0007 | Identidad y autorización | Keycloak (OIDC) + RBAC de plataforma + políticas de dominio; OpenFGA diferido | Apache 2.0 |
| 0008 | Trabajos y eventos | Outbox en PostgreSQL + pg-boss; Valkey/NATS diferidos | MIT |
| 0009 | Archivos | Puerto de almacenamiento: disco en desarrollo, compatible S3 (SeaweedFS) en producción | Apache 2.0 |
| 0010 | Reglas | JSONLogic (`json-logic-js`) con operadores propios registrados | MIT |
| 0011 | Contratos | OpenAPI 3.1 desde NestJS (`@nestjs/swagger`) + cliente generado con orval | MIT |
| 0012 | Entorno de desarrollo | ~~Docker Compose para servicios~~ → reemplazado por ADR-0020: PostgreSQL local + Keycloak en `.local/` + Node nativo, sin Docker | — |
| 0013 | Calidad y CI | GitHub Actions: lint, tipos, Vitest, Playwright (humo), dependency-cruiser, Semgrep CE, OSV-Scanner, gitleaks, verificación de licencias; Trivy y SBOM CycloneDX en fase 8 | varias abiertas |
| 0014 | Observabilidad | OpenTelemetry SDK + pino (JSON); Prometheus/Grafana/Loki/Tempo en fase 8 | Apache 2.0 / MIT |
| 0015 | Despliegue | Imágenes OCI + Compose para piloto; Helm + Kubernetes + OpenTofu + Argo CD en fase 8 | Apache 2.0 / MPL 2.0 |
| 0016 | IA | Puerto definido; LiteLLM autogestionado + modelos locales (Ollama/vLLM) al activarse | MIT |
| 0017 | Sistema de diseño | Tokens como variables CSS en `packages/ui` (formato W3C Design Tokens); catálogo de componentes en `/dev/componentes`; Style Dictionary y Storybook cuando haya móvil | MIT |
| 0018 | Documentos | Actas y fichas en PDF con pdfmake; exportación Excel con exceljs | MIT |
| 0019 | Pruebas | Vitest (unidad e integración contra PostgreSQL local, base `priora_test`), Playwright (e2e) | MIT / Apache 2.0 |

## 4. Multiempresa

Ver `docs/specs/seguridad-y-multiempresa.md`. Resumen: base compartida con RLS por defecto; base o despliegue dedicado para bancos con el mismo código; la empresa viaja en el contexto de cada petición, trabajo y evento; sin empresa la consulta falla; prueba de aislamiento obligatoria por módulo; configuración por empresa (marca, idioma, módulos, SSO, plantilla).

## 5. Look and feel

Por definir en el paso 0.5 (se pregunta al usuario: referencias visuales, colores, tipografía, densidad, claro/oscuro). Fijo: marca por empresa (logo y color primario con verificación automática de contraste WCAG 2.2 AA), español de Ecuador con textos externalizados (next-intl), tablas densas con filtros (el usuario principal es la PMO), accesible con teclado. Entregables: guía de estilo breve, tokens, ~15 componentes base y cinco pantallas plantilla (inicio de sesión, panel, listado con filtros, formulario, detalle).

## 6. Regla de licencias

Preferir MIT, Apache 2.0, BSD o MPL. AGPL solo para componentes usados sin modificar como servicio aparte (p. ej., Grafana). BSL, SSPL o "source-available" requieren ADR de excepción. **bpmn-js no se usa** (licencia propia con marca de agua obligatoria). CI verifica licencias de dependencias nuevas.

## 7. Subagentes y comandos

Ver `.claude/agents/` y `.claude/commands/`. Flujo por funcionalidad: `/spec` → `/plan` → `/tasks` → `/implement` (una tarea por sesión, pruebas primero) → `/review` → PR con controles en verde y aprobación humana.
