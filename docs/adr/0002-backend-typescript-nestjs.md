# ADR-0002: Backend en TypeScript con NestJS

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
El estándar SynapTech recomienda TypeScript + NestJS; Orbyta ya usa TypeScript; un solo lenguaje en web, API, motor y plantillas reduce contexto para Claude Code y para el equipo.

## Decisión
Node.js en su versión LTS vigente, TypeScript estricto, NestJS. El motor de flujos (`packages/workflow-engine`) es TypeScript puro sin NestJS.

## Alternativas consideradas
Java/Spring Boot (más maduro en banca, pero dos lenguajes y más memoria); .NET.

## Consecuencias
Contratos y tipos compartidos de punta a punta. Due diligence bancaria: documentar soporte LTS y política de actualizaciones.
