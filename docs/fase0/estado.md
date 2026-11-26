# Estado del proyecto Priora

> Léelo al iniciar cada sesión. Actualízalo al terminar cada tarea. Breve: lo histórico se resume, no se acumula.

## Ahora

- **Fase:** 0 (ligera)
- **Paso actual:** 0.2 Repositorio y esqueleto, rama `fase0/0.2`. Plan y tareas aprobados (`docs/specs/features/paso-0.2-esqueleto.md`). T1 a T5 hechas.
- **Siguiente acción:** `/clear`, `/estado` y `/implement T6` (`db:init`; requiere PostgreSQL local y superusuario, ver spec §3). Repo git local creado; no hacer push sin que el responsable lo pida.

## Decisiones tomadas (antes de abrir Claude Code)

- 2026-11-25 · Fase 0 ligera (Compose, sin Kubernetes hasta la fase 8).
- 2026-11-25 · Motor de flujos propio con definiciones versionadas y parametrizables desde administración (ADR-0004).
- 2026-11-25 · Canales: web responsiva + API; IA diferida con puerto definido (ADR-0016).
- 2026-11-25 · Backend TypeScript + NestJS; PostgreSQL con RLS; Keycloak.
- 2026-11-25 · Nombre de código: Priora (confirmado; nombre comercial pendiente de verificar marca y dominio).
- 2026-11-25 · Primera plantilla: marco metodológico bancario v2.0 (`docs/referencia/`), con nombres de áreas neutrales; segunda plantilla genérica para demostrar parametrización.

## Respuestas de arranque (paso 0.1)

| Pregunta | Respuesta |
| --- | --- |
| Nombre de código | Priora (confirmado) |
| Repositorio GitHub | https://github.com/leonardojreyes/priora (existe; el directorio local aún no es repo git: `git init` + remoto en 0.2) |
| Protección de `main` | no respondida; se asume sin protección, se documenta en 0.4 |
| Revisores humanos | Solo el responsable: usuario de GitHub `leonardojreyes` (deducido de la URL del repo) |
| Destino del primer despliegue | no respondida; por defecto: solo local hasta la fase 4 |
| Desarrolladores en Windows | no respondida; por defecto: sí, se prueba en ambos |
| PostgreSQL | Ya instalado localmente: 16.15, puerto 5432, con bases `orbyta` y `sigsio` de otros proyectos. **Opción B:** el responsable usa su instancia local en lugar del contenedor |

- 2026-11-25 · **Paso 0.1:** los 19 ADR (0001 a 0019) pasan a **Aceptado** tal cual, sin cambios de texto (decisión del responsable, opción b).
- 2026-11-25 · PostgreSQL local (opción B): se creará `priora` y `priora_test` sin tocar `orbyta` ni `sigsio`; roles `priora_migrator` y `priora_app` (los roles son globales del servidor). Contraseñas solo en `.env`.

## Observaciones técnicas del asistente (no incorporadas a los ADR; tratar en el paso indicado)

- **ADR-0004:** riesgo de que el motor crezca (temporizadores durables, paralelismo, versionado). Mantener catálogo cerrado de nodos y puerto de persistencia; la "exportación a BPMN 2.0" del ADR no se implementa hasta que un cliente la pida (paso: fase 2).
- **ADR-0006:** exigir `FORCE ROW LEVEL SECURITY`; rol migrador distinto del de aplicación y sin BYPASSRLS en este; envoltorio transaccional que falla sin empresa; `expectTenantIsolation` con caso de reutilización de pool; parte de las migraciones (políticas, trigger de bitácora) será SQL manual (paso 0.6).
- **ADR-0012:** 8 GB está justo (Docker Desktop ~2 GB + Keycloak ~768 MB + Node). Sugerido: Keycloak bajo un `profile` de Compose hasta 0.6, `DATABASE_URL` para usar PostgreSQL local, y fijar PostgreSQL 16.x en Compose y CI. Medir consumo real en 0.2 y reabrir con datos si no cabe. Estas ideas contradicen el texto aceptado en parte (0012 dice PostgreSQL en Compose; 0006 "versión vigente"): si se adoptan, requieren ADR nuevo que reemplace.
- **ADR-0010:** `json-logic-js` tiene poco mantenimiento; encapsularlo tras un puerto propio. **ADR-0013:** una matriz de CI macOS+Windows duplica el tiempo; decidir en 0.4.

## Pendientes y preguntas abiertas

- **El repositorio de GitHub `leonardojreyes/priora` es público** y `docs/referencia/` es confidencial; el responsable decidió (2026-11-25) que no importa. No se empuja nada sin que lo pida.
- Primer commit local (`chore: import initial project package`) hecho en `main` y rama de trabajo `fase0/0.2`; `main` aún no existe en el remoto.
- Confirmar usuario de GitHub del revisor, protección de `main`, destino de despliegue y pruebas en Windows (se aplican los valores por defecto hasta entonces).

- Montos de autorización de la Mesa de Demanda y rango de presupuesto de cambio moderado: "por definir" en el marco; la plantilla los deja en `null` (configurables).
- Instrumentos de la plantilla bancaria pendientes por fase: ver `plantillas/marco-tic-banca/plantilla.yaml › pendientes`.
- Feriados de Ecuador: cargar en la fase 1.

## Diferencias detectadas entre el marco y las specs

(ninguna aún)

## Historial resumido

- 2026-11-26 · 0.2 T5: `pnpm plantillas:validar <carpeta>` (`scripts/lib/validar-plantillas.mjs`, js-yaml 4.1.1 MIT): YAML, ids duplicados, enlaces rotos, flujos inexistentes, nodos inalcanzables o sin salida, decisiones sin `por_defecto`. Un `traspaso` cuenta como terminal. Pasa en ambas plantillas; 9 fixtures en `scripts/test/fixtures/plantillas/`.
- 2026-11-26 · 0.2 T4: `modules/ejemplo` (entidad `Ejemplo`, 4 capas), `.dependency-cruiser.cjs` (3 reglas), `pnpm lint:arch` (dependency-cruiser 18.9.0, MIT, en `@priora/scripts`) y comprobación de que `apps/` y `modules/` no referencian `.local/`. 9 fixtures en `scripts/test/fixtures/arquitectura/`.
- 2026-11-25 · 0.2 T3: `packages/workflow-engine` vacío (`ENGINE_NAME`), una prueba y umbral de cobertura 90% verificado (falla por debajo). `@vitest/coverage-v8` 5.1.2 agregado a `minimumReleaseAgeExclude`.
- 2026-11-25 · 0.2 T2: `.env.example`, `docs/fase0/variables-de-entorno.md` y prueba que los mantiene sincronizados (`scripts/`, paquete `@priora/scripts`, Vitest 5.1.2).
- 2026-11-25 · 0.2 T1: raíz del monorepo (pnpm 12.8.1, Turborepo 2.11, ESLint 10, Prettier 3.10, TypeScript 6.0.3 por compatibilidad con typescript-eslint 8.74, que exige TS < 6.1) y `packages/config`. ADR-0020 aceptado (desarrollo nativo sin Docker).
- 2026-11-25 · Paso 0.1 ejecutado: preguntas de arranque, resumen de ADR, 19 ADR aceptados, TODO 0.1 marcada.
- 2026-11-25 · Paquete inicial del proyecto generado (specs, plantillas, ADR propuestos, context engineering).
- 2026-11-25 · Nombre cambiado a Priora; agregados PRD.md, ARCHITECTURE.md, TODO.md y el comando /diagnosticar.
