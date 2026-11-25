# ADR-0006: PostgreSQL con RLS y Drizzle ORM

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** PostgreSQL / Apache 2.0

## Contexto
Aislamiento multiempresa garantizado por la base. Necesidad de JSONB para datos de instrumentos y de SQL explícito para vistas de indicadores.

## Decisión
PostgreSQL (versión estable vigente) con RLS en toda tabla de negocio; rol de aplicación sin BYPASSRLS; `set_config('app.tenant_id')` por transacción. Drizzle ORM y drizzle-kit para esquema y migraciones (migración aplicada = inmutable). pg_trgm para duplicados.

## Alternativas consideradas
Prisma (manejo de RLS por transacción más incómodo); TypeORM.

## Consecuencias
Las migraciones se revisan a mano; el hook protege las ya aplicadas.
