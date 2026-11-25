# Fase 4 · Requerimientos: priorización, capacidad, sesiones y ejecución

**Objetivo:** gobernar de punta a punta los requerimientos y la validación de pre-proyectos. **Hito: primera versión usable (MVP).** Al cerrar esta fase un cliente puede operar su Mesa de Demanda en Priora.

**Lee antes de empezar:** `docs/specs/priorizacion-capacidad-sesiones.md`, `plantillas/marco-tic-banca/{priorizacion,capacidad,gobierno,cambios}.yaml`, `flujos/m1-requerimientos.yaml`, `flujos/sub-*.yaml`. Detalle solo si hace falta: `docs/referencia/marco/05-marco1-requerimientos.md`, `07-modelo-de-priorizacion.md`, `08-gobierno-roles-y-comisiones.md` (§8.1), `09-instrumentos.md` (§9.2, 9.4, 9.8, 9.9, 9.10, 9.13 a 9.17).

## Historias

1. **Instrumentos de la fase** (escritos desde el marco): `historia-usuario` (9.4, con bloque POC/Estimación y relación 1:1/1:N por flag), `ficha-preproyecto` parte A (9.3), `evaluacion-privacidad` (9.13), `definiciones` (9.16), `plan-transicion` (9.8), `cierre-operativo` (9.15), `solicitud-cambio` (9.9, variante CHG-DEM).
2. **Modelos de priorización**: esquema, administración (pesos que suman 1, anclas, bandas, núcleo común), versionado.
3. **Pantalla de evaluación** (hoja 9.2): anclas visibles, justificación en 2 y 4, banderas, total, banda y núcleo en vivo, sugerencia de capacidad.
4. **Reglas de decisión** como servicio que devuelve recomendación y motivo.
5. **Capacidad**: reporte por área y período, precarga de compromisos, tarea "actualizar capacidad" antes de cada sesión, vista consolidada con "cabe / no cabe", regla estricta con excepción, saturación estructural.
6. **Sesiones**: planificar, agenda automática, publicar (abre revisión ejecutiva), asistentes y quórum, decisión ítem por ítem con recomendación, cierre, **acta PDF** (pdfmake) y extractos por ítem en el expediente.
7. **Revisión ejecutiva**: vista del revisor, pronunciamiento, efecto en agenda, regla de "una sola revisión salvo cambio material".
8. **Diferidos**: cadencia, reevaluaciones en agenda, última reevaluación sin opción de diferir, bitácora 9.14 generada.
9. **Inicio programado**: fecha desde capacidad, tope, recordatorio previo, tramo "espera de capacidad".
10. **Ejecución**: subflujos `sub-construir` y `sub-certificar-implementar` operativos (bloqueo por observación crítica, conformidad UAT, decisión de pase, rollback).
11. **Cierre**: verificación de expediente completo según artefacto mínimo de la categoría.
12. **Control de cambios en requerimientos**: magnitudes de `cambios.yaml`, CHG-DEM, vuelta al triage cuando cambia el grupo.
13. **Conflictos de capacidad** entre requerimientos (los que involucran proyectos se completan en la fase 5).
14. **Despliegue de piloto** con `compose.prod.yml` en el destino acordado en el paso 0.1.

## Criterios de aceptación
- Los casos `scoring` y los recorridos 1, 3, 4 y 6 de `casos-prueba.yaml` pasan en prueba automática.
- Una sesión sin quórum o sin capacidad completa no permite registrar decisiones de priorización (salvo fecha externa) y el acta lo dice.
- El acta PDF contiene asistentes, quórum, capacidad usada, decisiones con justificación y pronunciamientos.
- Un pre-proyecto validado aparece en el flujo de proyectos como "proyecto propuesto" con su PPY (la fase 5 continúa desde ahí).
- `demo-pyme` sigue funcionando sin sesiones ni capacidad (prueba de regresión con la plantilla genérica).

## Demo de cierre
Simulación de una Mesa de Demanda real: cinco ítems en agenda (uno con fecha regulatoria, uno sin capacidad, un pre-proyecto, uno con revisión ejecutiva desfavorable, uno diferido en su segunda reevaluación), se decide cada uno y se descarga el acta.
