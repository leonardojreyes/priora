# ADR-0003: Monorepo con pnpm workspaces y Turborepo

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
El estándar propone Nx. La opción Fase 0 ligera prioriza poca configuración y bajo consumo.

## Decisión
pnpm workspaces + Turborepo para tareas y caché; dependency-cruiser para hacer cumplir límites entre módulos y capas. Estructura: `apps/{api,worker,web}`, `modules/*`, `packages/{workflow-engine,contracts,ui,config}`.

## Alternativas consideradas
Nx (más potente en generadores y grafo, más pesado de configurar); solo pnpm workspaces (sin caché de tareas).

## Consecuencias
Si el repositorio crece a muchos equipos, reevaluar Nx con un ADR.
