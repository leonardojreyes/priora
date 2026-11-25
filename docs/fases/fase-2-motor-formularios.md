# Fase 2 · Motor de flujos y formularios dinámicos

**Objetivo:** ejecutar flujos e instrumentos definidos en YAML, con bandeja de tareas, temporizadores y diagrama. Es la fase más crítica: sin ella no hay parametrización.

**Lee antes de empezar:** `docs/specs/motor-flujos.md` completo, `docs/specs/instrumentos.md` §1 y §2, `docs/adr/0004-*.md`, `docs/adr/0010-*.md`, `plantillas/generica-simple/` completa.

## Historias

1. **Esquemas** zod de flujo e instrumento (todas las claves de motor-flujos §3.6 e instrumentos §2). Clave desconocida = error.
2. **Validador de definiciones** (motor-flujos §4) en `packages/workflow-engine`, sin dependencias de infraestructura, con mensajes por ruta de campo.
3. **Calendario laboral** (días hábiles, feriados, zona horaria) con pruebas de bordes (fin de año, feriados encadenados).
4. **Evaluador de reglas** JSONLogic con operadores propios y contexto de solo lectura.
5. **Intérprete**: todos los tipos de nodo (incluidas uniones inclusivas y subflujos con parámetros), acciones del catálogo como *efectos solicitados*, idempotencia, concurrencia optimista. Cobertura ≥ 90%.
6. **Persistencia y API** (`modules/flujos`): definiciones (borrador/publicada/retirada), instancias, tokens, tareas, temporizadores en pg-boss, ejecución de efectos (notificar por Mailpit, asignar ID con secuencia por empresa y año, crear/emitir registro).
7. **Formularios dinámicos**: render desde la definición (todas las clases de campo de instrumentos §2.1, salvo `arbol_clasificacion`, que llega en la fase 3), validación servidor y cliente con el mismo esquema, borrador/emisión por sección, versiones, permisos por sección.
8. **Bandeja de tareas** ("Mi bandeja"): asignadas y tomables, filtros, vencimiento; completar tarea con acciones, preguntas y justificación.
9. **Ficha de la demanda (v1)**: datos núcleo, línea de tiempo desde la bitácora, nodo actual sobre el diagrama (React Flow + dagre, carriles por responsable), registros emitidos.
10. **Administración › Flujos e instrumentos (v1)**: subir YAML, ver errores de validación, publicar, ver diagrama, exportar BPMN 2.0 XML.
11. **Administración › Plazos**: tabla de tramos (plazos máximos); el worker revisa vencimientos cada hora.

## Criterios de aceptación
- La plantilla `generica-simple` se recorre de punta a punta en la interfaz y en la prueba automática de su `casos-prueba.yaml`.
- Los cinco flujos de `marco-tic-banca` **validan** sin errores (aunque aún no se ejecuten todos sus nodos `sesion`, que llegan en la fase 4).
- Un vencimiento configurado a 2 días hábiles un viernes previo a feriado vence en la fecha correcta (prueba).
- Dos usuarios completan la misma tarea a la vez: uno gana, el otro recibe un error claro; no hay doble transición.
- El BPMN exportado abre en un visor estándar (bpmn.io demo en línea o Camunda Modeler) sin errores.

## Demo de cierre
En `demo-pyme`, un usuario de Ventas registra una solicitud, el analista la evalúa, el gerente la aprueba, el responsable la ejecuta y el solicitante confirma; el responsable ve todo en la línea de tiempo y en el diagrama.
