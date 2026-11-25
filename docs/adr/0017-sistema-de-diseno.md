# ADR-0017: Sistema de diseño liviano

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
Solo hay web en el alcance; Storybook y Style Dictionary agregan dependencias y tiempo.

## Decisión
Tokens en formato W3C Design Tokens compilados a variables CSS en `packages/ui`; tema por empresa sobre esas variables; componentes shadcn/ui adaptados; página `/dev/componentes` (solo en desarrollo) como catálogo visual. Storybook y Style Dictionary cuando se agregue móvil.

## Alternativas consideradas
Storybook desde el inicio.

## Consecuencias
El auditor de accesibilidad revisa la página catálogo con axe.
