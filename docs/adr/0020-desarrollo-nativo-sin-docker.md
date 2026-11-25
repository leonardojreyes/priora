# ADR-0020: Desarrollo nativo sin Docker

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Reemplaza parcialmente a:** ADR-0012 (Compose en desarrollo) y la regla P14 de `base-tecnica.md` ("máximo 3 contenedores")
- **Licencias involucradas:** PostgreSQL License (PostgreSQL), Apache 2.0 (Keycloak), GPLv2+Classpath Exception (OpenJDK, solo como runtime local descargado, no se distribuye)

## Contexto
El equipo de desarrollo (MacBook M1 de 8 GB) no puede ejecutar Docker Desktop (~2 GB de RAM). El proyecto hermano sig-iso resolvió lo mismo con desarrollo nativo y funciona bien: PostgreSQL de Homebrew, Keycloak y su JRE descargados a `.local/`, y scripts de Node para inicializar todo. En la máquina ya hay PostgreSQL 16.15 en el puerto 5432 con bases de otros proyectos (`orbyta`, `sigsio`) que no deben tocarse.

## Decisión
1. **Desarrollo y pruebas, cero contenedores.** PostgreSQL 16 local (Homebrew en macOS; instalador oficial en Windows). Keycloak y un JRE se descargan a `.local/` (ignorado por git) con `pnpm keycloak:install` y se manejan con `pnpm keycloak:start|stop|status|reset|realm`. API, worker y web con Node nativo (`pnpm dev`).
2. **`pnpm db:init`** (script Node, idempotente) se conecta como superusuario local, crea las bases `priora` y `priora_test` y los roles `priora_migrator` (dueño del esquema, solo migraciones), `priora_app` (sin BYPASSRLS, único rol que usa la aplicación) y `priora_test`, y escribe las URLs por rol en `.env.local` (permisos 0600, no versionado). No toca otras bases. Los roles son globales del servidor, por lo que se usa el prefijo `priora_`.
3. **`pnpm bootstrap`** encadena `db:init`, `db:migrate`, `db:seed` y `keycloak:install`.
4. **Compose queda solo para despliegue** en servidor o cliente (`compose.prod.yml`, fase 4, según ADR-0015), nunca en el flujo diario. Puede adoptarse más adelante sin rehacer nada, por este compromiso: **toda configuración va por variables de entorno** (`DATABASE_URL_*`, `OIDC_ISSUER_URL`, etc.) y **ningún código depende de rutas locales ni de `.local/`**. Dentro de un contenedor solo cambian los valores (por ejemplo, el host de PostgreSQL pasa a ser el nombre del servicio). Las migraciones, la semilla y la importación del realm son scripts de Node que corren igual en un contenedor.
5. **Correo en desarrollo:** Mailpit no se instala hasta la fase 3 (notificaciones); entonces se usa su binario nativo o un puerto `Mailer` con adaptador de consola.
6. **Fuera de alcance:** Nx y OpenFGA (usados en sig-iso) no se incorporan. Se mantiene Turborepo (ADR-0003) y autorización en dos capas sin OpenFGA (ADR-0007).
7. Versiones: PostgreSQL 16.x fijado en la guía de ejecución y en la CI (ADR-0013).

## Alternativas consideradas
- **Compose en desarrollo (ADR-0012 original):** descartada; no corre en el equipo del responsable.
- **Dev Container:** descartada por la misma razón y por consumo de disco.
- **PostgreSQL embebido (pglite, etc.):** descartada; las pruebas de RLS y de roles exigen PostgreSQL real.

## Consecuencias
- Arranque ligero y rápido; sin Docker en ningún paso de 0.2 a 0.7.
- El README y `docs/fase0/guia-de-ejecucion.md` documentan requisitos, primera vez y uso diario. La CI usa un servicio PostgreSQL 16 de GitHub Actions.
- Compose y los `Dockerfile` de `api`, `worker` y `web` se agregan en la fase 4 y requieren un equipo con Docker (servidor o máquina de pruebas), más un paso de CI que construya las imágenes.
- Riesgo de divergencia entre el entorno nativo y el contenedor; se mitiga probando `compose.prod.yml` en la fase 4 antes del piloto.
- Hay que reflejar este ADR en `base-tecnica.md` (P14, §3) y en `CLAUDE.md` ("Liviano").
