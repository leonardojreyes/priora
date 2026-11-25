# Fase 6 · Plazos, semáforo, indicadores y notificaciones

**Objetivo:** que las instancias decidan con datos sin pedir informes. **Hito: versión completa.**

**Lee antes de empezar:** `docs/specs/plazos-semaforo-indicadores.md`, `plantillas/marco-tic-banca/plazos.yaml`. Detalle solo si hace falta: `docs/referencia/marco/10-indicadores-de-control-y-valor.md`, `11-roadmap-de-implantacion-y-plazos-objetivo.md`.

## Historias

1. **Semáforo** como función SQL sobre fecha vigente, umbral por categoría/etapa y estado; casos borde (suspendido, diferido, cancelado, finalizado tarde).
2. **Suspensión y reactivación** con desplazamiento de la fecha vigente.
3. **Plazos máximos hasta la decisión**: vencimientos con sus efectos (`agendar_con_prioridad`, `ofrecer_dar_plazo_o_rechazar`…) y tablero de "abiertas fuera de plazo".
4. **Catálogo de indicadores** (14) como vistas materializadas refrescadas por el worker; filtros por período, área, grupo y categoría; administración de cuáles se muestran y sus metas.
5. **Tableros**: de la instancia (Mesa y Comisión), cartera regulatoria consolidada, lista de proyectos activos, "Mi área".
6. **Notificaciones**: plantillas por evento editables por la empresa, preferencias por usuario (inmediata o resumen diario), notificaciones en la aplicación.
7. **Exportación** a Excel y CSV de todas las vistas tabulares (exceljs).
8. **Encuesta CSAT** opcional al cerrar.

## Criterios de aceptación
- Con un juego de datos semilla de 200 demandas en distintos estados, cada indicador coincide con un cálculo manual de referencia (prueba).
- El semáforo de un ítem suspendido 5 días y reactivado se desplaza 5 días (prueba).
- Ningún indicador exige capturar un campo adicional (revisión del subagente experto-dominio).

## Demo de cierre
Tablero mensual de la Mesa de Demanda con los indicadores del marco y la cartera regulatoria, exportado a Excel.
