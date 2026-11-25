# ADR-0011: Contrato primero con OpenAPI 3.1

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
La web y las integraciones futuras (ITSM, ERP) consumen la misma API.

## Decisión
OpenAPI 3.1 generado desde NestJS (`@nestjs/swagger`), publicado en `packages/contracts`; cliente TypeScript generado con orval. CI falla si el contrato cambió y el cliente no se regeneró. Los esquemas de plantillas (zod → JSON Schema) también viven en `packages/contracts`.

## Alternativas consideradas
tRPC (acopla web y API, cierra la puerta a terceros).

## Consecuencias
Versionado de API por prefijo `/api/v1`.
