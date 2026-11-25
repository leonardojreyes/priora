# ADR-0019: Estrategia de pruebas

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT / Apache 2.0

## Contexto
El motor y las reglas son el corazón; deben probarse sin base de datos. El aislamiento multiempresa debe probarse contra PostgreSQL real.

## Decisión
Vitest para unidad (motor, reglas, scoring, calendario, políticas) e integración (repositorios contra la base `priora_test` del PostgreSQL de Compose); Playwright para e2e de humo y para los recorridos de `casos-prueba.yaml`. Cobertura mínima: 90% en `packages/workflow-engine`, 70% en módulos.

## Alternativas consideradas
Testcontainers (otro contenedor por suite; pesado en la M1).

## Consecuencias
—
