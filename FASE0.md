# FASE 0 · Priora: sistema de gestión de demanda de requerimientos y proyectos de TI

> Prompt de arranque para Claude Code. Generado con el skill `fase0-producto-synaptech` v1.0, opción **Fase 0 ligera**. Uso: abre Claude Code en la raíz del repositorio y escribe **"Lee FASE0.md y ejecuta el paso 0.1"**.

## 1. Rol y objetivo

Actúa como **arquitecto de software y líder técnico de SynapTech**. Tu objetivo es ejecutar la Fase 0 de Priora paso a paso y dejar un **esqueleto caminante** sobre el que, fase a fase (sección 9), se construye un sistema usable de gestión de demanda de TI que distintas empresas configuran sin tocar código.

## 2. Contexto del producto

- **Qué resuelve:** ordena la demanda de tecnología de una organización. Una sola puerta de entrada; clasificación con un árbol de decisión; priorización con modelos ponderados contra la capacidad real de las áreas; decisiones colegiadas con quórum y acta; ejecución trazable; plazos, semáforo e indicadores.
- **Para quién:** PMO, PM de demanda, áreas solicitantes, comités de TI y alta dirección de empresas medianas y grandes del Ecuador. Primer cliente objetivo: un banco (cliente regulado).
- **Fuente funcional:** `docs/referencia/` (marco metodológico de un banco, v2.0, y sus BPMN). Es la **primera plantilla**, no el producto.
- **Requisito central:** áreas, instancias de gobierno, pasos, compuertas, formularios, pesos, plazos y umbrales varían entre empresas, así que son **configuración versionada** (`docs/specs/parametrizacion.md`). Se entrega con dos plantillas: `marco-tic-banca` y `generica-simple`.
- **Canales:** web responsiva y API. Sin app móvil en el alcance inicial.
- **Multiempresa:** sí, desde el día uno; marca por empresa (logo y color primario).
- **IA:** no en la primera versión; el puerto queda definido (ADR-0016).
- **Integraciones:** ninguna obligatoria al inicio; API abierta para ITSM/ERP más adelante. Correo para notificaciones.
- **Restricciones:** equipo pequeño; máquina de desarrollo MacBook M1 de 8 GB (también hay desarrolladores en Windows); se necesita **progreso visible en cada paso**.
- **Nombre de código:** Priora (confirmado).

## 3. Reglas de trabajo

1. Ejecuta **un paso a la vez**. Al final de cada paso entrega el reporte de la sección 8 y **espera la palabra "aprobado"** antes de seguir.
2. Diseña en **modo plan** antes de editar archivos cuando el paso cree más de tres archivos o toque la arquitectura.
3. Mantén `docs/fase0/estado.md` (paso actual, decisiones, pendientes, próximos pasos). **Al iniciar cualquier sesión, léelo primero**; luego lee solo los documentos que el paso actual nombra.
4. Registra cada decisión nueva como ADR en `docs/adr/` (comando `/adr`). Los ADR 0001 a 0019 ya existen como *Propuesto*.
5. Si falta información, **pregunta**; no supongas. Si una regla de `docs/referencia/` choca con una spec de `docs/specs/`, manda la spec y anota la diferencia en el estado.
6. **Nunca:** commits directos a `main`; secretos en el código; dependencias con licencia no permitida sin ADR de excepción (base técnica §6); comandos destructivos, `--force` o acciones contra producción sin aprobación; escribir en código nombres propios de la plantilla bancaria ("Mesa de Demanda", "VPEG", "Medios Tecnológicos").
7. Todo debe funcionar igual en **Windows y macOS**: scripts en Node, rutas con `path`, `.gitattributes` con `eol=lf`.
8. **Liviano:** en desarrollo, como máximo tres contenedores (PostgreSQL, Keycloak, Mailpit) con límites de memoria; API, worker y web corren con Node nativo. No agregues servicios sin ADR.
9. **Progreso visible:** cada paso termina con algo que el responsable puede ver o ejecutar en su máquina con un solo comando, y el reporte dice cuál es.
10. Trabaja en ramas `fase0/<paso>` y abre un PR por paso.
11. **Verificación propia:** no des nada por terminado sin ejecutar tú mismo el comando que lo prueba (prueba, lint, build o el comando del entregable).
12. **Diagnóstico antes de corregir:** ante un error que no se resuelve al primer intento, usa `/diagnosticar` (solo lectura) y espera aprobación de la causa raíz antes de editar.
13. **Contexto limpio:** al cerrar cada paso, con el estado y `TODO.md` al día, recomienda al responsable ejecutar `/clear`; la sesión siguiente empieza con `/estado`.

## 4. Preguntas de arranque (comando `/inicio`, en el paso 0.1)

Haz solo estas, en una ronda, con opciones y un valor por defecto:

1. URL del repositorio de GitHub y si ya tiene protección de rama `main`.
2. **Revisores humanos** de los PR (quién aprueba).
3. **Destino del primer despliegue** del piloto: servidor on-premise del cliente con Docker, VM en nube privada, o solo local por ahora (por defecto: solo local hasta la fase 4).
4. ¿Habrá desarrolladores en Windows desde el inicio? (por defecto: sí; se prueba en ambos)

El look and feel se pregunta en el paso 0.5.

## 5. Base técnica

Está en **`docs/fase0/base-tecnica.md`** (decisiones, principios P1 a P14, stack con licencias, multiempresa, look and feel, regla de licencias, subagentes y comandos). Léela en el paso 0.1. CLAUDE.md enlaza a ese archivo; no lo copies en otro lado.

## 6. Pasos de la Fase 0

### 0.1 Decisiones fundacionales (conversación, sin código)
- **Objetivo:** cerrar las decisiones abiertas y aprobar los ADR.
- **Actividades:** ejecuta `/inicio`; lee `PRD.md`, `ARCHITECTURE.md`, `docs/fase0/base-tecnica.md`, `docs/adr/README.md` y `docs/specs/dominio.md`; si algo del PRD o la arquitectura no te cierra, dilo; presenta un resumen de una página de los ADR propuestos señalando los dos o tres con más riesgo (0004 motor propio, 0006 RLS con Drizzle, 0012 entorno liviano) y cualquier objeción técnica que tengas. Ajusta los ADR según las respuestas.
- **Archivos:** `docs/adr/*.md` (estado a *Aceptado* con fecha), `docs/fase0/estado.md`, `TODO.md` (casilla 0.1), ajustes a `PRD.md` o `ARCHITECTURE.md` si los hubo.
- **Entregable / salida:** ADR 0001 a 0019 en *Aceptado* o *Rechazado* con motivo; preguntas de arranque respondidas en el estado.

### 0.2 Repositorio y esqueleto
- **Objetivo:** monorepo que compila, prueba y levanta en un comando.
- **Actividades:** verifica las versiones estables vigentes (Node LTS, pnpm, NestJS, Next.js, PostgreSQL, Keycloak) y fíjalas; crea pnpm workspaces + Turborepo; `apps/api` (NestJS con `/health` y OpenAPI en `/api/docs`), `apps/worker` (pg-boss con un trabajo de prueba), `apps/web` (Next.js con una página "Priora" y la lista de módulos), `packages/workflow-engine` (vacío con una prueba), `packages/contracts`, `packages/ui`, `packages/config` (ESLint, TS, Prettier compartidos); un módulo de ejemplo `modules/ejemplo` con las cuatro capas; `compose.yaml` con PostgreSQL, Keycloak (`start-dev`, realm importado desde `infra/keycloak/realm-priora.json`, límite 768 MB) y Mailpit; scripts Node `pnpm bootstrap` (crea `.env` desde `.env.example`, levanta Compose, migra; no uses el nombre `setup`, que pnpm reserva) y `pnpm dev`; `scripts/validar-plantillas.mjs` con el comando `pnpm plantillas:validar <carpeta>` (por ahora: sintaxis YAML y grafos de flujo sin enlaces rotos, nodos inalcanzables ni decisiones sin `por_defecto`; los esquemas zod se agregan en las fases 1 y 2); reglas de dependency-cruiser (el dominio no importa infraestructura ni NestJS; los módulos no se importan entre sí salvo por su `application` pública); `.editorconfig` y `.nvmrc` (revisa `.gitattributes` y `.gitignore`, que ya existen), README con requisitos.
- **Entregable / salida:** en macOS y en Windows, `pnpm bootstrap && pnpm dev` deja la web en `http://localhost:3000` y `/health` respondiendo; `pnpm build`, `pnpm test` y `pnpm lint` en verde; una importación prohibida hace fallar `pnpm lint:arch`.

### 0.3 Context engineering
- **Objetivo:** que Claude trabaje con poco contexto y sin correcciones manuales.
- **Actividades:** revisa y ajusta `CLAUDE.md` (máximo 150 líneas) y que `ARCHITECTURE.md` refleje el esqueleto real, crea `CLAUDE.md` por carpeta en `apps/api`, `apps/web`, `packages/workflow-engine` y `modules/` (máximo 40 líneas cada uno: qué hay, convenciones, cómo probar); verifica que los hooks de `.claude/hooks/` funcionan en macOS y Windows (prueba: editar `.env` queda bloqueado; un `rm -rf` queda bloqueado; editar un `.ts` lo formatea); prueba los subagentes y comandos de `.claude/` (incluido `/diagnosticar` con un error provocado: debe reportar la causa sin editar nada).
- **Entregable / salida:** con `/spec modulo de prueba "ping"` → `/plan` → `/tasks` → `/implement` → `/review`, Claude genera un módulo `ping` con su prueba sin que el responsable corrija nada; luego se borra en el mismo PR.

### 0.4 Pipeline y calidad
- **Objetivo:** nada llega a `main` sin controles.
- **Actividades:** `.github/workflows/ci.yml` según ADR-0013 (lint, formato, tipos, dependency-cruiser, Vitest con servicio PostgreSQL, validación de plantillas con un script que por ahora solo verifica YAML y grafos de flujo, Playwright de humo, Semgrep CE, OSV-Scanner, gitleaks, verificación de licencias); plantilla de PR con checklist; protección de rama documentada; Dependabot o Renovate.
- **Entregable / salida:** un PR de prueba con un secreto falso, una dependencia GPL y una importación prohibida queda **bloqueado** con tres errores claros; el PR limpio pasa.

### 0.5 Look and feel
- **Objetivo:** identidad visual aprobada y tematizable por empresa.
- **Actividades:** pregunta al responsable: referencias visuales (apps o sitios y qué le gusta de cada uno), estilo y tono, colores de SynapTech o neutros, tipografía, densidad (sugerencia: densa, la PMO trabaja con tablas), claro/oscuro. Con eso: tokens W3C en `packages/ui/tokens`, variables CSS, tema por empresa (logo y color primario con verificación de contraste WCAG 2.2 AA que rechaza combinaciones ilegibles), unos 15 componentes base (botón, campo, selector, fecha, tabla con filtros y paginación, pestañas, tarjeta, insignia de estado, semáforo, modal, menú lateral, encabezado, línea de tiempo, estado vacío, aviso), y cinco pantallas plantilla con datos ficticios: inicio de sesión, panel, listado con filtros ("Bandeja"), formulario ("Nueva demanda") y detalle ("Ficha de la demanda" con línea de tiempo). Textos externalizados con next-intl (es-EC).
- **Entregable / salida:** catálogo en `/dev/componentes` y las cinco pantallas navegables; axe sin errores graves; el responsable aprueba con capturas.

### 0.6 Plataforma transversal
- **Objetivo:** identidad, empresa, aislamiento y auditoría funcionando de verdad.
- **Actividades:** inicio de sesión OIDC con Keycloak (PKCE) en la web y validación de token en la API; resolución de empresa desde el token en un solo interceptor; tablas base (`tenant`, `usuario`, `area`, `evento`) con RLS y rol de aplicación sin BYPASSRLS; `set_config('app.tenant_id')` por transacción; bitácora append-only con trigger que impide `update`/`delete`; servicio de políticas `modules/acceso` con su prueba; OpenTelemetry + pino con `tenant_id`; semilla con dos empresas (`demo-banco`, `demo-pyme`) y usuarios de prueba por rol en el realm; prueba de aislamiento reutilizable (`expectTenantIsolation(repo)`).
- **Entregable / salida:** un usuario de `demo-banco` inicia sesión, ve el panel con el logo de su empresa y su nombre; uno de `demo-pyme` ve el suyo; la prueba de aislamiento demuestra que B no lee ni modifica datos de A por API ni por repositorio; cada inicio de sesión queda en la bitácora.

### 0.7 Seguridad y cumplimiento base
- **Objetivo:** paquete mínimo para una due diligence temprana.
- **Actividades:** `docs/security/stride.md` (modelo de amenazas de la arquitectura actual), `docs/security/clasificacion-datos.md` (qué datos personales maneja Priora: usuarios, dueños funcionales, adjuntos), `docs/security/lopdp.md` (registro de actividades de tratamiento inicial, retención propuesta), cabeceras de seguridad y CSP en la web, límite de tasa en la API, `SECURITY.md`. Pasa `revisor-seguridad` y `revisor-cumplimiento` sobre todo el repositorio.
- **Entregable / salida:** los cuatro documentos, sin hallazgos críticos abiertos de los subagentes ni de los escáneres.

*Del estándar SynapTech se omiten en esta Fase 0 ligera el paso de puerto de IA (va a la fase 9) y el de infraestructura Kubernetes (va a la fase 8).*

## 7. Criterio de salida de la Fase 0

El esqueleto caminante corre con `pnpm bootstrap && pnpm dev` en macOS y Windows con el look and feel aprobado; un usuario inicia sesión con Keycloak, ve solo los datos y la marca de su empresa, y la acción queda en la bitácora; la prueba de aislamiento está en verde; el cambio llegó a `main` por PR con todos los controles en verde y aprobación humana; `docs/fase0/estado.md` dice "Fase 0 cerrada" con la lista de pendientes trasladados a la fase 1.

## 8. Formato del reporte de paso

```
## Reporte · paso 0.X · <título>
**Qué se hizo:** …
**Cómo verlo:** <comando o URL que el responsable ejecuta>
**Archivos creados o cambiados:** …
**Pruebas y controles:** <comando> → <resultado>
**Decisiones tomadas:** … (ADR nuevos: …)
**Riesgos o pendientes:** …
**Necesito de ti:** … / "Nada; espero 'aprobado'".
```

## 9. Después de la Fase 0: hoja de ruta hasta un sistema usable

Cada fase tiene su archivo en `docs/fases/` y sus historias como casillas en `TODO.md`. Para empezar una fase: **"Lee docs/fases/fase-N-*.md y ejecuta /spec para su primera historia"** (o el comando `/fase N`). Dentro de cada fase rige el flujo `/spec → /plan → /tasks → /implement → /review` y las mismas reglas de la sección 3.

| Fase | Resultado visible | Hito |
| --- | --- | --- |
| 1 · Configuración base | La empresa se crea desde una plantilla; administración de organización, roles, taxonomía, estrategia y calendario | |
| 2 · Motor y formularios | Flujos y formularios definidos en YAML se validan, se publican, se ven como diagrama y se ejecutan con bandeja de tareas | |
| 3 · Entrada y triage | Canal único, bandeja de triage, árbol de clasificación, verificación normativa, devoluciones | **Piloto de entrada** |
| 4 · Requerimientos | Priorización, capacidad, sesiones con quórum y acta, revisión ejecutiva, diferidos, ejecución, cierre, cambios | **Primera versión usable (MVP)** |
| 5 · Proyectos | Levantamiento, costo y retorno, Comisión, PRY, acta de constitución, riesgos, informes, transición, cierre y beneficios | |
| 6 · Plazos, semáforo e indicadores | Tableros por instancia, cartera regulatoria, 14 indicadores, notificaciones, exportación | **Versión completa** |
| 7 · Administración avanzada | Editor visual de flujos e instrumentos, constructor de reglas, migración de instancias, exportar/importar configuración | |
| 8 · Producción | Helm/Kubernetes, respaldos, observabilidad completa, Trivy/SBOM, pruebas de carga, firma de actas, manuales | **Listo para instalar en un cliente** |
| 9 · IA (opcional) | Sugerencia de clasificación y redacción asistida con modelo elegible | |
