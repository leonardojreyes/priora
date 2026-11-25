# ADR-0014: Observabilidad con OpenTelemetry

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** Apache 2.0 / MIT

## Contexto
Se necesita trazabilidad por empresa sin montar un stack completo en desarrollo.

## Decisión
OpenTelemetry SDK en API y worker con exportador a consola/OTLP opcional; logs JSON con pino incluyendo `tenant_id`, `usuario` y `traza`. El stack Prometheus/Grafana/Loki/Tempo se agrega en la fase 8 o se usa el del cliente.

## Alternativas consideradas
Stack completo desde el día uno (memoria).

## Consecuencias
—
