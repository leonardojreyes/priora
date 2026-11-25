# ADR-0012: Entorno de desarrollo liviano

- **Estado:** Aceptado (2026-11-25)
- **Reemplazado por:** ADR-0020
- **Fecha:** 2026-11-25
- **Licencias involucradas:** —

## Contexto
MacBook M1 de 8 GB y equipo en Windows y macOS. La Fase 0 anterior de Orbyta se abortó por pesada.

## Decisión
Docker Compose solo para servicios: PostgreSQL, Keycloak (`start-dev`, límite 768 MB) y Mailpit. API, worker y web corren con Node nativo (`pnpm dev`). Scripts en Node (no bash). `.gitattributes` con `eol=lf`. Dev Container disponible pero opcional.

## Alternativas consideradas
Dev Container obligatorio (consume más memoria y disco en la M1).

## Consecuencias
Documentar en el README los requisitos mínimos y cómo apagar servicios que no se usen.
