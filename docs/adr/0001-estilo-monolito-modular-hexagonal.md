# ADR-0001: Estilo: monolito modular con arquitectura hexagonal

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** —

## Contexto
Producto nuevo con un equipo pequeño y una máquina de desarrollo limitada (8 GB). El dominio tiene límites claros (entrada, flujos, priorización, gobierno, capacidad, indicadores) pero comparte transacciones.

## Decisión
Un solo despliegue de API y un worker. Cada módulo en `modules/<modulo>/{domain,application,infrastructure,interface}`. El dominio no importa NestJS, Drizzle ni bibliotecas de infraestructura. Un módulo se separa en servicio solo con una razón medible (carga, equipo, ciclo de despliegue) y un ADR nuevo.

## Alternativas consideradas
Microservicios desde el inicio (descartado: costo operativo y de memoria sin beneficio actual).

## Consecuencias
Refactorizaciones baratas; límites vigilados por dependency-cruiser (ADR-0003) y el subagente arquitecto.
