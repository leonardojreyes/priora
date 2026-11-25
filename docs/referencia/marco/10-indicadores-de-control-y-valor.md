# 10. Indicadores de control y valor

## 10.1 Cuadro de indicadores

Los catorce indicadores son los estrictamente necesarios. Se revisan mensualmente en la Mesa de Demanda (flujo, calidad, entrega, concentración de demanda, capacidad y oportunidad) y en la Comisión de proyectos (entrega, beneficios, costo, concentración y composición de proyectos, capacidad y oportunidad).

| **Dimensión** | **Indicador** | **Para qué sirve** |
|---|---|---|
| **Flujo** | Demandas recibidas por grupo y categoría | Control de volumen y origen; detecta canales paralelos. |
| **Flujo** | Lead time por categoría y por tramo: triage (registro a clasificación), decisión (clasificación a decisión de la instancia), espera de capacidad (decisión a inicio, solo en ítems aprobados con inicio programado, 7.3) y atención (inicio a cierre; sin inicio programado, el inicio coincide con la decisión) | Velocidad de punta a punta y en cada tramo; muestra en qué tramo está el cuello de botella. El tramo de triage se compara con su máximo de 3 días hábiles (11.3). |
| **Calidad** | % de solicitudes devueltas por información incompleta | Detecta mala captura en el origen. |
| **Priorización** | Distribución de la demanda entre los objetivos estratégicos | Como toda demanda declara alineación (2.1), muestra cuánta capacidad recibe cada objetivo del plan y detecta objetivos estratégicos desatendidos o sin demanda asociada. |
| **Concentración de demanda** | Distribución de demandas priorizadas por área del banco (últimos N meses) | Detecta áreas que saturan la capacidad de Medios Tecnológicos de forma sistemática. |
| **Capacidad** | Utilización de capacidad por área (comprometida / disponible, 9.17) | Muestra qué áreas operan cerca del límite y anticipa conflictos de capacidad (7.4 · 7.5). Sustenta la regla de saturación estructural (7.4). Se calcula con la matriz que las áreas ya reportan. |
| **Entrega** | Cumplimiento de plazo de entrega: % de requerimientos cerrados dentro de su fecha comprometida vigente (Marco 1) y % de hitos cumplidos en proyectos activos (Marco 2), con el número de reprogramaciones frente a la línea base | Control de ejecución. Las reprogramaciones evitan que aprobar cambios de fecha maquille el resultado (10.2). |
| **Cambio** | % de cambios exitosos / fallidos / revertidos | Estabilidad de producción. |
| **Concentración de proyectos** | Distribución de proyectos por área del banco (últimos N meses) | Detecta concentración inequitativa de inversión TIC. |
| **Composición de la cartera** | Distribución de proyectos por categoría (Proyectos IT4IT · Proyecto Estratégico · Proyecto Operativo, ver 9.0.3) y de requerimientos por categoría | Muestra de qué está hecho el trabajo activo y si está desbalanceado (ej. mucho IT4IT y poco Estratégico, o la capacidad absorbida por Cumplimiento normativo). |
| **Beneficios** | % de proyectos con beneficios medidos post-implementación | Evita cierres cosméticos. |
| **Financiero** | Desviación del costo real frente al estimado (9.7) | Calidad de la estimación. |
| **Satisfacción** | CSAT interno por entrega | Experiencia del área solicitante. |
| **Oportunidad** | Cumplimiento de plazos hasta la decisión: % de solicitudes decididas dentro de los plazos máximos (11.3) y, como complemento, solicitudes abiertas fuera de plazo | Detecta demanda estancada antes de que alguna instancia decida. |

**Participación del Área Financiera en los indicadores:** el Área Financiera participa en la definición de los indicadores económicos y de beneficio del marco (desviación de costo según 9.7, beneficios medidos post-implementación y los dos de concentración por área en su dimensión de inversión) y los co-revisa con la PMO en la Comisión de proyectos. Para cada proyecto, el Área Financiera ayuda a fijar, en el levantamiento del proyecto (fase 1, 6.3), las metas cuantitativas de beneficio que luego se verifican al cierre (fase 6); de ese modo el indicador no se inventa al final, sino que se define al inicio y se mide contra lo proyectado. Esto conecta la hoja de costo y retorno (9.7) con el seguimiento de beneficios (9.11): el Área Financiera co-define la línea base y la meta en el levantamiento, y confirma el resultado real en el cierre.

**De dónde salen las fechas.** Los indicadores de tiempo usan fechas que los instrumentos ya registran: registro y clasificación en la ficha 9.1; decisión de la instancia en la hoja 9.2 («Fecha de evaluación y decisión»); cierre en la ficha 9.15 para los requerimientos y en el seguimiento 9.11 para los proyectos; y fechas comprometidas, de línea base y vigente en la ficha 9.1 y el acta 9.5.

**Regla anti-burocracia:** ningún indicador puede exigir que los equipos llenen formularios adicionales. Los catorce se calculan con los datos que el flujo ya genera.

## 10.2 Semaforización de cumplimiento de plazo

**Qué es y qué no es.** El semáforo es una vista calculada del cumplimiento de plazo de cada ítem vivo, en Marco 1 y en Marco 2 por igual. Nadie lo captura ni lo elige: se deriva de dos datos que las plantillas ya registran (la fecha fin comprometida y la fecha del día), y por eso no viola la regla anti-burocracia de 10.1. Su propósito es que la Mesa de Demanda y la Comisión de proyectos vean, sin pedir informes adicionales, qué está por vencer y qué ya venció.

**No confundir con el campo Estado.** El Estado (9.1) indica dónde está el ítem en su ciclo de vida (Planificación, En ejecución, En pruebas, Suspendido, Finalizado, Cancelado). El semáforo indica cómo va de tiempo. Son dimensiones independientes: un ítem «En ejecución» puede estar verde o rojo. Los colores nunca se registran en el campo Estado ni amplían su taxonomía.

| **Color** | **Condición** | **Lectura** |
|---|---|---|
| **Verde** | La fecha fin comprometida vigente aún no se alcanza y falta más que el umbral n definido para su categoría (11.2). | Dentro de plazo; no requiere acción. |
| **Amarillo** | Faltan n días o menos para la fecha fin comprometida vigente, según el umbral de su categoría (11.2). | Alerta temprana: el responsable confirma si llega o escala antes del vencimiento. |
| **Rojo** | La fecha fin comprometida vigente ya pasó y el ítem no está Finalizado. | Incumplido; se reporta a la instancia que gobierna ese backlog. |
| **Sin fecha** | El ítem no tiene fecha fin comprometida registrada. | No es verde: es un vacío de registro y se cuenta aparte, para que no sea la vía de escape del semáforo. |

**Contra qué fecha se calcula: la regla de línea base.** Todo ítem conserva dos fechas: la *línea base* (la comprometida al inicio, en el acta 9.5 para Marco 2 o al asignar responsable y fecha objetivo en la ficha 9.1, en la fase 3 de Marco 1, 5.3) y la *vigente*, que resulta de los cambios de cronograma formalmente aprobados según los umbrales de 6.6. El semáforo se calcula siempre contra la fecha vigente, porque es lo justo con el equipo que ejecuta. Pero la línea base original nunca se borra: el reporte muestra en paralelo cuántas veces se reprogramó el ítem y la desviación acumulada frente a la fecha original. Sin esa segunda mirada, bastaría con aprobar cambios de fecha para que todo el portafolio estuviera permanentemente en verde, y el semáforo dejaría de informar. Un proyecto verde con tres reprogramaciones aprobadas no es lo mismo que uno verde sin ninguna, y la instancia debe ver ambas cosas.

**Casos borde.** Se resuelven así, de forma uniforme para los dos marcos.

- **Suspendido:** el reloj se detiene. Se registra la fecha de suspensión y el conteo se reanuda al reactivarse, desplazando la fecha vigente por los días efectivamente suspendidos. Un ítem suspendido no muestra color.

- **Diferido:** los ítems diferidos (condición dentro de «Planificación») no tienen semáforo de plazo. Su control es la cadencia obligatoria de reevaluación de la bitácora 9.14 (15 días en Marco 1, un mes en Marco 2, hasta dos reevaluaciones), no una fecha fin de entrega.

- **Finalizado fuera de plazo:** conserva el rojo en el histórico. El cierre no borra el atraso; si lo borrara, el indicador de lead time y el de cumplimiento de plazo de entrega perderían sentido y el semáforo solo reflejaría el presente.

- **Cancelado:** sale del semáforo desde la fecha de cancelación, con el motivo registrado en el acta 9.10. No se contabiliza como incumplimiento de plazo.

**Quién lo produce y dónde se revisa.** Lo calculan el PM de demanda, sobre el backlog de requerimientos de Marco 1, y el PM de proyecto, sobre los proyectos que lidera en Marco 2; la PMO lo consolida dentro del reporte agregado que ya le corresponde (8.3). Se revisa en la Mesa de Demanda para el backlog de requerimientos y en la Comisión de proyectos para el backlog de proyectos, en la misma sesión mensual en que se revisan los indicadores de 10.1. No crea una instancia de gobierno nueva ni un informe aparte. Su resumen en porcentaje es el indicador «Cumplimiento de plazo de entrega» (10.1).

