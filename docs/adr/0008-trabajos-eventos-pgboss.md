# ADR-0008: Trabajos programados y eventos sobre PostgreSQL

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
Se necesitan temporizadores (plazos, reevaluaciones, recordatorios), notificaciones y refresco de indicadores, sin agregar contenedores.

## Decisión
Patrón outbox en PostgreSQL y colas/trabajos con pg-boss en `apps/worker`. Cada trabajo lleva `tenant_id`.

## Alternativas consideradas
Valkey + BullMQ (otro contenedor); NATS (cuando haya integración entre servicios).

## Consecuencias
Revisar en fase 8 si el volumen exige otra cola.
