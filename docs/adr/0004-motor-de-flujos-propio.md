# ADR-0004: Motor de flujos propio y declarativo

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** —

## Contexto
El sistema debe adaptarse a empresas con áreas, pasos y reglas distintas. Las reglas de gobierno (sesiones con quórum, capacidad, diferidos con cadencia, revisión ejecutiva) no son BPMN estándar. Los motores BPMN abiertos (Flowable, Camunda 7 CE) son Java, pesados y su soporte comunitario es incierto; bpmn-js tiene licencia propia con marca de agua.

## Decisión
Intérprete propio en `packages/workflow-engine` que ejecuta definiciones YAML/JSON versionadas (`docs/specs/motor-flujos.md`). Reglas en JSONLogic (ADR-0010). Acciones de un catálogo cerrado. Exportación a BPMN 2.0 XML para documentar e intercambiar. Diagrama de solo lectura con React Flow + dagre; editor visual en la fase 7.

## Alternativas consideradas
Motor BPMN embebido (Flowable/Camunda); flujo fijo en código con solo catálogos configurables.

## Consecuencias
Mayor control y menor huella; costo: mantener el intérprete y su validador con pruebas exhaustivas.
