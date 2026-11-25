# Referencia: marco metodológico de origen

Esta carpeta contiene la **fuente funcional** de Cauce: el *Marco metodológico de gestión de requerimientos (BAU) y proyectos tecnológicos*, versión 2.0 (archivo v8.4), escrito para un banco, y los tres diagramas BPMN que lo resumen.

## Cómo usarla

- **No la leas completa.** Abre solo la sección que necesitas (cada archivo es una sección del documento original).
- El marco es **la primera plantilla** del producto, no el producto. Todo nombre propio de áreas, instancias, roles, plazos y pesos se modela como **dato configurable por empresa** (ver `docs/specs/parametrizacion.md`). Nunca escribas en código "Mesa de Demanda", "VPEG" o "Medios Tecnológicos".
- Cuando una regla del marco y una spec de `docs/specs/` difieran, manda la spec (es la traducción a producto) y anota la diferencia en `docs/fase0/estado.md` para que el responsable la revise.

## Índice

| Archivo | Contenido | Úsalo para |
| --- | --- | --- |
| `marco/04-taxonomia-y-triage-marco0.md` | Grupos, categorías, pre-proyecto, origen normativo, árbol de decisión, datos mínimos, Marco 0 | Fase 3 (triage) |
| `marco/05-marco1-requerimientos.md` | Flujo de Marco 1, control de cambios, pre-proyecto, POC, etapas de ejecución (5.7) | Fase 4 |
| `marco/06-marco2-proyectos.md` | Ciclo de proyecto, Discovery, evaluación económica, cambios 6.6, presentación 6.11 | Fase 5 |
| `marco/07-modelo-de-priorizacion.md` | Modelos de scoring, bandas, reglas de decisión, capacidad, conflictos | Fases 4 y 5 |
| `marco/08-gobierno-roles-y-comisiones.md` | Instancias, quórum, VPEG, roles, RACI | Fases 1, 4 y 5 |
| `marco/09-instrumentos.md` | Los 19 instrumentos (9.1 a 9.19), IDs, expediente | Formularios de todas las fases |
| `marco/10-indicadores-de-control-y-valor.md` | 14 indicadores y semáforo | Fase 6 |
| `marco/11-roadmap-de-implantacion-y-plazos-objetivo.md` | Plazos objetivo, umbrales, plazos máximos | Fases 2 a 6 |
| `marco/12-anexos-operativos.md` | Checklist, antipatrones, revisión técnica | Fase 5 |
| `marco/13-glosario-operativo.md` | Glosario | Consultas puntuales |
| `img/bpmn-marco0-triage.png` | BPMN Marco 0 | Fase 3 |
| `img/bpmn-marco1-requerimientos.png` | BPMN Marco 1 | Fase 4 |
| `img/bpmn-marco2-proyectos.png` | BPMN Marco 2 | Fase 5 |

## Confidencialidad

El documento pertenece al cliente que lo encargó. Se usa como insumo de diseño. No se publica, no se incluye en el instalable del producto y la plantilla `plantillas/marco-tic-banca/` usa nombres neutrales cuando el nombre es propio del cliente.
