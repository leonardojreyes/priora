# Spec: plazos, semáforo e indicadores

Fuentes: `docs/referencia/marco/10-indicadores-de-control-y-valor.md`, `11-roadmap-de-implantacion-y-plazos-objetivo.md`.

## 1. Plazos máximos hasta la decisión (configurables en `plazos.yaml`)

Cada tramo define: desde qué evento, hasta qué evento, plazo (hábiles o calendario), y qué pasa al vencer (`notificar`, `agendar_con_prioridad`, `cancelar`, `ofrecer_dar_plazo_o_rechazar`, `clasificar_con_declaracion`, `entra_con_informacion_disponible`). El worker revisa vencimientos cada hora y ejecuta. Valores de la plantilla bancaria (dh = días hábiles): registro→clasificación 3 dh; verificación normativa 2 dh; reingreso de demanda devuelta 10 dh (al vencer se cancela); clasificación→sesión 10 dh (requerimiento) y 20 dh (pre-proyecto); levantamiento→comisión 30 dh; inicio programado máx. 30 días (requerimientos) y 3 meses (proyectos); diferido máx. 30 días (requerimientos) y 2 meses (proyectos).

## 2. Semáforo de cumplimiento de plazo

Cálculo **en consulta** (vista SQL o función), nunca guardado como estado:

- **Verde**: hoy < fecha vigente − n (n = umbral de la categoría).
- **Amarillo**: faltan n días o menos.
- **Rojo**: fecha vigente pasada y no finalizado. Finalizado tarde conserva rojo en histórico.
- **Sin fecha**: no hay fecha comprometida; se cuenta aparte.
- **Suspendido**: sin color; la fecha vigente se desplaza por los días suspendidos al reactivar.
- **Diferido**: sin semáforo de entrega (lo controla la cadencia).
- **Cancelado**: fuera del semáforo.

Fechas: **línea base** (al comprometer) y **vigente** (cambia solo por cambio aprobado). Se calcula contra la vigente y se muestra el número de reprogramaciones.

## 3. Indicadores (14 en la plantilla, catálogo extensible)

Todos se calculan desde la **bitácora de eventos** y las tablas operativas; ninguno exige captura adicional. Se implementan como vistas materializadas refrescadas por el worker (cada 15 minutos) y consultas parametrizadas por período, área, grupo y categoría.

| Clave | Indicador | Cálculo base |
| --- | --- | --- |
| `recibidas` | Demandas recibidas por grupo y categoría | conteo por fecha de registro |
| `lead_time_tramo` | Lead time por categoría y tramo (triage, decisión, espera de capacidad, atención) | diferencias entre eventos de cambio de tramo, en días hábiles |
| `devueltas` | % devueltas por información incompleta | devoluciones / registradas |
| `distribucion_objetivos` | Distribución entre objetivos estratégicos | priorizadas por objetivo, en número y horas |
| `concentracion_demanda` | Demandas priorizadas por área (últimos N meses) | |
| `utilizacion_capacidad` | Comprometida / total por área | último reporte del período |
| `cumplimiento_entrega` | % cerrados en fecha vigente (M1) y % hitos cumplidos (M2) + reprogramaciones | |
| `cambios_productivos` | % exitosos / fallidos / revertidos | desde plan de transición |
| `concentracion_proyectos` | Proyectos por área | |
| `composicion_cartera` | Proyectos y requerimientos por categoría | |
| `beneficios_medidos` | % proyectos con beneficios medidos | desde seguimiento de beneficios |
| `desviacion_costo` | Costo real vs. estimado | desde hoja de costo y retorno y cierre |
| `csat` | Satisfacción interna por entrega | encuesta de 1 a 5 al cerrar (opcional) |
| `oportunidad` | % decididas dentro del plazo máximo + abiertas fuera de plazo | tramos de §1 |

## 4. Tableros (fase 6)

- **Tablero de la instancia** (Mesa de Demanda / Comisión): backlog con semáforo, diferidos y su próxima reevaluación, inicio programado, capacidad, indicadores del mes.
- **Cartera regulatoria consolidada**: todos los ítems con origen normativo verificado o categoría con `entra_cartera_regulatoria`, en todos los flujos, con fecha límite y estado. Se adjunta automáticamente a cada sesión de la instancia que la recibe.
- **Lista de proyectos activos**: estado, fase, semáforo, dependencias, PM, sponsor.
- **Mi área**: lo que mi área pidió y en qué tramo está; lo que mi área debe ejecutar.
- Exportación a Excel (xlsx) y CSV de toda vista tabular.
