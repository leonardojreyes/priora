# Fase 3 · Entrada única y triage

**Objetivo:** que toda demanda entre por un solo canal y salga clasificada y enrutada, con la plantilla bancaria. **Hito: piloto de entrada** (la PMO de un cliente puede empezar a registrar y clasificar demanda real).

**Lee antes de empezar:** `docs/specs/clasificacion-y-triage.md`, `plantillas/marco-tic-banca/{arbol-clasificacion.yaml,instrumentos/ficha-demanda.yaml,flujos/m0-entrada.yaml,casos-prueba.yaml}`, y solo si necesitas detalle: `docs/referencia/marco/04-taxonomia-y-triage-marco0.md`, `docs/referencia/img/bpmn-marco0-triage.png`.

## Historias

1. **Canal único "Nueva demanda"**: sección A de la ficha de entrada, borradores, adjuntos al expediente, DEM visible al enviar y correo de confirmación.
2. **Detección de duplicados** con `pg_trgm` al registrar y en el triage.
3. **Bandeja de triage**: días hábiles frente al plazo, validar completitud, devolver con detalle (plazo de reingreso; cancelación automática al vencer), cerrar por duplicado.
4. **Árbol de clasificación**: esquema y administración (`arbol-clasificacion.yaml`), componente guiado `arbol_clasificacion`, factor de esfuerzo automático, sugerencia de categoría por precedencia con razón obligatoria si se elige otra.
5. **Verificación del origen normativo**: instrumento `verificacion-origen` (escríbelo desde el marco §4.2), tarea al área verificadora con plazo, efectos sobre marcas y entrada directa.
6. **Enrutamiento**: traspasos a `m1-requerimientos` o `m2-proyectos` (que por ahora terminan en una tarea "En espera de fase 4/5" visible), asignación de PPY, notificación "clasificada".
7. **Mis demandas** (solicitante) y **Demandas de mi área**: lista con tramo, estado y responsable de seguimiento.
8. **Plantillas de notificación** de esta fase (registrada, devuelta, cancelada por vencimiento, clasificada).

## Criterios de aceptación
- Los siete casos `arbol` de `casos-prueba.yaml` pasan en prueba automática.
- La demanda devuelta y no reingresada en 10 días hábiles se cancela sola (prueba con reloj simulado).
- Sin verificación confirmada, un "mandato regulatorio" va a pre-proyecto, no a entrada directa.
- La misma funcionalidad de canal único sirve en `demo-pyme` (sin árbol ni verificación).
- Prueba de aislamiento y axe en verde en todas las pantallas nuevas.

## Demo de cierre
Se registran las cuatro demandas de ejemplo del marco §4.4 y el PM de demanda las clasifica en vivo; cada una termina en la ruta correcta con su identificador.
