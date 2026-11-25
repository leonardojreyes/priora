# 9. Artefactos obligatorios e instrumentos

Esta sección reúne los diecinueve instrumentos del marco, con los campos mínimos que necesita cada decisión. Primero se indica qué artefacto exige cada nivel de demanda; luego se entregan las plantillas, pensadas para copiarse a la herramienta que use el banco (tablero, ITSM, formularios) con pocos ajustes. La regla de la sección 4.4 aplica a todas: si un campo no aporta a clasificar, priorizar o decidir, se deja vacío sin culpa.

## 9.0 Mapa de etapa a instrumento (lectura rápida)

| **Etapa del proceso** | **Instrumento** | **Quién lo completa** | **Dónde se usa** |
|---|---|---|---|
| Marco 0: registro, triage y clasificación (4.4) | 9.1 Ficha única de demanda y triage | Área solicitante (ingresa) + Mesa de triage, que conduce el PM de demanda (registra y clasifica) | Canal único |
| Priorización de demanda, pre-proyectos y proyectos | 9.2 Hoja de priorización (scoring) | PM de demanda (pre-priorización) + la instancia que decide | Mesa de Demanda y Comisión de proyectos |
| Pre-proyecto (Marco 1) y levantamiento del proyecto (Marco 2) | 9.3 Ficha de pre-proyecto y caso de negocio ligero | Dueño funcional + PM de demanda; en Marco 2 se suman Administración y Área Financiera | Mesa de Demanda (valida) y Comisión de proyectos (aprueba) |
| Todo requerimiento (BAU) de Marco 1 (4.4) | 9.4 Historia de usuario | Analista de negocio | Backlog de producto o ticket, según el nivel |
| Inicio formal de proyecto, con el resultado del Discovery (6.3.1) | 9.5 Acta de constitución | PM de proyecto | Comisión de proyectos |
| Gestión de riesgos del proyecto | 9.6 Matriz de riesgos | PM de proyecto | Comisión de proyectos |
| Costo y retorno de la inversión | 9.7 Hoja de costo y retorno | Área solicitante (volumen y ahorros) + Administración (CAPEX y OPEX) + Área Financiera (análisis) | Levantamiento del proyecto (6.3) y Comisión de proyectos |
| Pase a producción: «Desplegar y validar» (Marco 1) y «Transición a producción» (Marco 2) | 9.8 Plan de transición | Equipo asignado + PM de proyecto; certifican Seguridad Bancaria, Gestión de Procesos, Cumplimiento y Arquitectura | Control de cambios productivo (5.3 · 6.3 · 6.7) |
| Cambio en proyecto en ejecución | 9.9 Solicitud de control de cambios | PM de proyecto | Comisión de proyectos (6.6) |
| Cierre de reuniones de gobierno | 9.10 Acta de sesión con decisiones | PM de demanda, secretario técnico de la instancia | Todas las instancias |
| Verificación de beneficios reales | 9.11 Seguimiento de beneficios | Sponsor + PM de proyecto; valida el Área Financiera | Fase 6 de Marco 2 (6.3) y post-implementación |
| Demanda de Marco 1 o proyecto ejecutado con un proveedor | 9.12 Ficha de proveedor | Administración (selecciona y contrata) + PMO o PM de proyecto | Desde la fase 1, por el acuerdo de confidencialidad, hasta el inicio y planificación de Marco 1 y Marco 2 (5.3 · 6.3 · 6.8.2) |
| Demanda o proyecto que introduce o modifica un tratamiento de datos personales | 9.13 Evaluación de datos y privacidad | Seguridad Bancaria + oficial de protección de datos | Análisis de Marco 1 (5.3) · planificación y revisión técnica de Marco 2 (6.9 · 12.3) |
| Demanda, pre-proyecto o proyecto diferido | 9.14 Bitácora de reevaluación de diferidos | PM de demanda, secretario técnico de la instancia | Mesa de Demanda y Comisión de proyectos (5.3 · 5.5 · 6.3) |
| Cierre de un requerimiento (BAU), en cualquier categoría | 9.15 Ficha de cierre operativo (Marco 1) | Área solicitante + responsable asignado; Gestión de Procesos verifica y registra (5.7) | Fase 5 de Marco 1 (5.3) |
| Definición funcional previa a construir | 9.16 Documento de definiciones | Gestión de Procesos + dueño funcional | Subprocesos «Atender y construir» (Marco 1) y «Construir y asegurar calidad» (Marco 2) |
| Priorización en la Mesa de Demanda y en la Comisión de proyectos | 9.17 Matriz de capacidades por área | Medios Tecnológicos, Gestión de Procesos, Seguridad Bancaria y Riesgos; consolida la PMO | Mesa de Demanda y Comisión de proyectos (7.4) |
| Seguimiento del proyecto en ejecución | 9.18 Informe de estado del proyecto | PM de proyecto; lo consolida la PMO | Sponsor, PMO y Comisión de proyectos (6.3 · 6.10) |
| Cierre de un proyecto, completado o cancelado | 9.19 Acta de cierre de proyecto | PM de proyecto; firman sponsor, PMO y Área Financiera; Gestión de Procesos verifica la evidencia de aceptación (5.7) | Fase 6 de Marco 2 (6.3); se informa a la Comisión de proyectos |

**Registros sin plantilla propia:** la lista de proyectos activos (6.10), la cartera regulatoria consolidada (7.3), el registro de tratamientos evaluados (9.13) y la plantilla de presentación ante la Comisión de proyectos (6.11) se llevan en las herramientas de la PMO, con los campos que esas secciones definen. No son instrumentos adicionales a los diecinueve.

### 9.0.1 Identificadores, trazabilidad y asignación

Para seguir una demanda de principio a fin, los instrumentos comparten una cadena simple de identificadores: el ID nace con la demanda y la acompaña a medida que avanza.

| **Identificador** | **Formato sugerido** | **Nace en / acompaña a** |
|---|---|---|
| ID de demanda | DEM-AAAA-NNNN (ej. DEM-2026-0142) | Nace en la ficha 9.1. Viaja por el scoring (9.2) y la ficha de pre-proyecto (9.3). |
| ID de pre-proyecto | PPY-AAAA-NNN (ej. PPY-2026-018) | Se asigna cuando una demanda se clasifica como pre-proyecto, en el triage (4.4) o por reclasificación en Marco 1 (5.4). Hereda el ID de demanda y lo conserva en Marco 2, como proyecto propuesto, hasta el acta de constitución (6.2 · 9.5). |
| ID de proyecto | PRY-AAAA-NNN (ej. PRY-2026-031) | Lo asigna la PMO cuando la Comisión de proyectos aprueba el proyecto y queda registrado en el acta de sesión (9.10); el acta de constitución (9.5) lo usa desde su emisión. Hereda el ID de pre-proyecto o, en la entrada directa (4.1), el ID de demanda, y lo llevan todos los instrumentos de proyecto (9.6 a 9.12, 9.18 y 9.19). La evaluación de datos y privacidad (9.13) no es exclusiva de proyecto: registra el ID de la demanda, del pre-proyecto o del proyecto, según dónde se origine. |
| ID de historia de usuario | HU-PROD-NNNN (ej. HU-CORE-0231) | Todo requerimiento (BAU) de Marco 1 genera al menos una historia (9.4), que registra el ID de la demanda de la que proviene. La relación es 1:N (una demanda puede descomponerse en varias historias, todas con el mismo DEM), salvo en Solicitud de información y POC / Estimaciones, donde es siempre 1:1. Se asocia además a un proyecto o pre-proyecto cuando nace dentro de uno. |

**Regla práctica:** cada instrumento registra su propio ID y, cuando corresponde, el ID del que proviene. La cadena queda: demanda → pre-proyecto (Marco 1) → proyecto (Marco 2) → (riesgos, costo, transición, beneficios), todos enlazados por el ID de proyecto; en la entrada directa, demanda → proyecto. En Marco 1 la cadena es más corta y siempre pasa por la historia: demanda → historia o historias de usuario → cierre. Al pasar de pre-proyecto a proyecto, el ID de proyecto hereda al de pre-proyecto, no lo reemplaza: por eso, desde un beneficio medido al final se puede llegar hacia atrás hasta la demanda original.

### Asignación de la demanda a lo largo del ciclo

Toda demanda tiene, en cada momento, un responsable de seguimiento con nombre y alguien que la representa por el negocio. La tabla indica quién es en cada tramo, sea que la demanda termine como requerimiento (BAU) o como proyecto.

| **Tramo** | **Responsable de seguimiento** | **Por el negocio** | **ID** |
|---|---|---|---|
| **Registro y clasificación (Marco 0)** | PM de demanda | Dueño funcional | DEM |
| **Análisis y priorización en Marco 1, incluido el diferido** | PM de demanda | Dueño funcional; en el pre-proyecto, además, el sponsor identificado | DEM o PPY |
| **Requerimiento priorizado: fases 3 a 5 de Marco 1** | Responsable asignado, que designa el área ejecutora y registra el PM de demanda en la fase 3 | Dueño funcional | DEM y HU |
| **Levantamiento y aprobación en Marco 2, incluido el diferido** | PM de demanda | Sponsor | PPY o DEM |
| **Proyecto aprobado: fases 3 a 6 de Marco 2** | PM de proyecto, que nombra la PMO en la fase 3 | Sponsor | PRY |

**Traspaso sin vacío.** Nadie suelta una demanda hasta que el siguiente responsable de seguimiento está nombrado. Cada traspaso queda registrado con su fecha en el campo «Seguimiento vigente» de la ficha 9.1 y, si nace de una decisión de una instancia, también en el acta (9.10). Si la demanda se reclasifica (4.3 · 5.4 · 5.5.3), el responsable pasa a ser el que indica la tabla para su nuevo tramo; la demanda conserva su DEM y sus documentos.

**Avisos al área solicitante.** El responsable de seguimiento del tramo avisa al área solicitante en cada cambio de etapa: clasificada, priorizada, diferida, rechazada, validada como proyecto, aprobada y cerrada. Usa la herramienta que ya emplee el banco; el aviso no requiere un formulario aparte.

### 9.0.2 Artefacto mínimo por categoría

**Base común:** todo ítem lleva la ficha única de demanda (9.1) y su expediente (9.0.4); todo ítem que se prioriza lleva además el scoring (9.2). La tabla indica lo que cada categoría o etapa agrega a esa base.

| **Categoría o etapa** | **Artefacto mínimo** | **Cuándo aplica** |
|---|---|---|
| Solicitud de información | Historia de usuario en su núcleo obligatorio (9.4), que puede vivir dentro del propio ticket, con la entrega validada + cierre (9.15). Se agrega la evaluación de datos y privacidad (9.13) si la información incluye datos personales y sale de su finalidad. | Información sin cambio de sistemas. |
| Evolutivo y Requerimientos IT4IT | Historia de usuario con su núcleo completo (9.4) y bloque ágil si el equipo trabaja con sprints + plan de transición con aceptación para el pase a producción (9.8) si pasa a producción, con llenado proporcional en un ajuste puntual + cierre (9.15) + documento de definiciones (9.16) si modifica una regla de negocio o un proceso bancario. Se agrega la evaluación de datos y privacidad (9.13) si introduce o modifica un tratamiento de datos personales. | Mejoras sobre sistemas existentes y sobre las capacidades internas de Medios Tecnológicos. |
| Cumplimiento normativo | Lo mismo que un Evolutivo + origen normativo verificado por Cumplimiento en la ficha 9.1, documento de origen en el expediente (9.0.4) y alcance normativo mínimo identificado (4.2). | Obligaciones que nacen de una norma, un organismo de control o una auditoría, interna o externa. |
| Mandatos de franquicias | Lo mismo que un Evolutivo + referencia del mandato y su fecha límite en la ficha 9.1. | Obligaciones fijadas por una franquicia de tarjetas. |
| POC / Estimaciones | Historia de usuario en su núcleo (9.4) con su bloque «POC / Estimación» + cierre con informe de resultado (9.15). Acuerdo de confidencialidad (NDA) firmado si participa un tercero (6.8.2). Método en 5.6. | Pruebas o estimaciones fuera de producción. |
| Pre-proyecto | Ficha de pre-proyecto y caso de negocio ligero (9.3), parte A, con su pre-priorización en el scoring (9.2) con el modelo de proyectos (7.1.2). | Cumple los criterios de conversión (5.5.1). Lo valida la Mesa de Demanda en Marco 1. |
| Proyecto | Caso de negocio ligero (9.3) completo, scoring (9.2), hoja de costo y retorno (9.7), acta con sus dependencias y el resultado del Discovery (9.5), plan proporcional, matriz de riesgos (9.6), informe de estado (9.18), documento de definiciones (9.16), plan de transición con aceptación para el pase a producción (9.8), seguimiento de beneficios (9.11) y acta de cierre (9.19). Además, si corresponde: solicitud de control de cambios (9.9) cuando hay cambios y evaluación de datos y privacidad (9.13) cuando trata datos personales. | Inversión formal: proyecto propuesto o de entrada directa (6.2), en cualquiera de sus tres categorías. |
| Con proveedor, en cualquier categoría | Ficha de proveedor (9.12), con el acuerdo de confidencialidad (NDA) firmado antes de compartir información (6.8.2). | Cuando la demanda o el proyecto se ejecuta total o parcialmente con un proveedor que hay que seleccionar y contratar. |

### 9.0.3 Categorías de proyecto (taxonomía del portafolio)

**Aplica al pre-proyecto y al proyecto:** la categoría de proyecto (sección 4) responde «¿de qué está compuesto el portafolio?», algo distinto de la clasificación por marco o de la alineación a un objetivo estratégico (2.1). Es solo un campo de clasificación, no un nuevo nivel de planificación ni una instancia de gobierno: no crea un registro de portafolio aparte de la lista de proyectos activos (6.10); el gobierno y las decisiones siguen siendo los mismos (Mesa de Demanda y Comisión de proyectos, 8.1). La asigna la Mesa de triage en la ficha 9.1, se registra en la ficha 9.3 y se hereda al acta de constitución (9.5).

**Innovación y regulación no son categorías de proyecto.** La prueba exploratoria se canaliza como POC / Estimaciones en los requerimientos (4) y el proyecto que resulte se clasifica en una de las tres categorías. Lo regulatorio se registra en la ficha 9.1 como origen normativo verificado por Cumplimiento y, si un tercero fija la fecha, como marca de obligación externa (4.2). El origen verificado alimenta la cartera regulatoria consolidada (7.3) en los dos marcos.

| **Categoría** | **Definición** | **Ejemplo** |
|---|---|---|
| Proyecto Estratégico | Impulsa los objetivos estratégicos del banco con alto impacto en el negocio: contribuye de forma directa y crítica a un objetivo estratégico nombrado (2.1.1). | Nueva plataforma de originación digital. |
| Proyecto Operativo | Responde a una necesidad específica del negocio, con alcance definido y seguimiento formal. No confundir con los requerimientos (BAU): es un proyecto completo, con presupuesto, PM de proyecto y acta. | Optimización de cobranzas; migración de una plataforma vigente. |
| Proyectos IT4IT | Mejora y fortalece los procesos y capacidades internas de Medios Tecnológicos, con alcance de proyecto. | Renovación de la plataforma de monitoreo; migración del centro de datos. |

### 9.0.4 Expediente de la demanda y del proyecto

**Para qué sirve:** fija dónde reposa la información de cada ítem, quién la custodia y cuánto se conserva, para que la evidencia esté completa y disponible ante la auditoría interna y el regulador. No es un instrumento adicional a los diecinueve: es la regla que ordena dónde viven los que ya existen.

- **Un expediente por ítem, identificado por su ID:** el expediente vive en el repositorio documental oficial del banco. El pre-proyecto abre su expediente con el PPY; al aprobarse, el mismo expediente pasa al PRY, igual que el identificador (9.0.1), sin abrir otro. En los requerimientos de Marco 1, el expediente es el propio ticket ITSM con sus adjuntos, para no duplicar el registro.

- **Contenido mínimo:** los instrumentos y evidencias que exige el artefacto mínimo de su categoría (9.0.2). En un proyecto: 9.2, 9.3, 9.5, 9.6, 9.7, 9.8 con el informe de certificación, la evidencia de UAT y la conformidad del dueño funcional, 9.9, los extractos de 9.10 que le corresponden, 9.11, 9.12 con el acuerdo de confidencialidad (NDA) y el contrato, 9.13 si aplica, 9.16, 9.18 y 9.19. En un requerimiento: 9.1, 9.2, 9.4, 9.8 si pasa a producción, 9.12 con el NDA si hay proveedor, 9.13 y 9.16 si aplican, y 9.15.

- **Custodia a lo largo del ciclo:** con la misma lógica de traspaso de 9.0.1. Custodia el PM de demanda hasta la aprobación; desde la fase 3, el PM de proyecto; en Marco 1, una vez priorizado el requerimiento, el responsable asignado. La PMO define la estructura del repositorio y los permisos de acceso, y archiva el expediente al cierre.

- **Reglas de uso:** una sola fuente: los documentos se referencian, no se copian entre expedientes. Los archivos se nombran con ID, instrumento, versión y fecha, por ejemplo «PRY-2026-031_9.5_v2_2026-03-15». El acceso sigue la clasificación de la información (6.9): el acuerdo de confidencialidad, el contrato y la información con datos personales van con acceso restringido. El expediente se conserva según la política de retención documental del banco y la normativa aplicable, validada con Cumplimiento y Legal.

- **Verificación al cierre:** en Marco 1, la ficha 9.15 confirma que el expediente está completo; en Marco 2, la PMO lo verifica antes de la firma del acta de cierre (9.19). Un ítem con expediente incompleto no se da por cerrado.

## 9.1 Ficha única de demanda y triage

**Cuándo se usa:** la parte A la completa el área solicitante al ingresar la necesidad en el canal único, para cualquier demanda. La parte B la completa la Mesa de triage, que conduce el PM de demanda: registra, valida la completitud, clasifica y enruta (4.4). La parte C se completa durante el análisis de Marco 1.

| | |
|---|---|
| **PARTE A. La completa el área solicitante al ingresar la necesidad** | |
| **ID de demanda** | (asignado por el sistema) |
| **Fecha de registro** | |
| **Área solicitante** | |
| **Departamento o sección** | Unidad concreta dentro del área solicitante; permite ver la concentración de demanda por debajo del nivel de área (10.1) |
| **Dueño funcional (nombre)** | Responde por el alcance funcional y por la aceptación de la entrega (8.2) |
| **Delegado funcional (nombre)** | Actúa en ausencia del dueño funcional; no sustituye su responsabilidad |
| **Antecedentes** | Qué ocurrió antes que da origen a esta demanda: intentos previos, decisiones tomadas, hallazgos de auditoría o compromisos asumidos |
| **Alcance de la iniciativa (breve descripción)** | Qué comprende y qué queda fuera, en pocas líneas; se precisa después en la historia de usuario (9.4) o en la ficha de pre-proyecto (9.3) |
| **Descripción del problema u oportunidad** | |
| **Proceso, servicio o aplicación afectada** | |
| **Áreas involucradas** | Además del área solicitante: áreas que participan, son afectadas o deben validar. Permite anticipar dependencias y conformidades antes de clasificar |
| **Urgencia** | Baja · Media · Alta · Crítica |
| **Fecha requerida y justificación** | Fecha y razón por la que se requiere para esa fecha; si responde a una obligación normativa, indicar la norma (7.3) |
| **Categoría de impacto estimado** | Clientes / ingresos / costo / riesgo / cumplimiento / eficiencia |
| **Detalle del impacto (una línea)** | Qué ocurre concretamente si la demanda no se atiende |
| **Esfuerzo y presupuesto referencial** | Esfuerzo estimado en días-persona y presupuesto referencial ya aprobado para la iniciativa, si existe (ver la referencia de esfuerzo de la sección 4). Si la demanda tiene presupuesto asignado en el plan anual, indicarlo: es una de las condiciones de entrada directa a Marco 2 (4.1) |
| **Beneficio esperado financiero** | Genera ingreso · genera ahorro. Adjuntar el análisis financiero del Área Financiera, si ya existe. En los proyectos, el análisis económico y financiero lo hace el Área Financiera en el levantamiento (6.3) |
| **Beneficio esperado no financiero** | Evita pérdida económica · optimización de tiempo (horas) · evita multa económica · otros. Si selecciona «otros», describir cuál es el beneficio tangible del proyecto para el banco |
| **Objetivo estratégico al que contribuye** | (obligatorio para toda demanda; nombre exacto del objetivo del plan, ver 2.1) · D1 · D2 · D3 · D4 |
| **OKR / Objetivos de las áreas** | Objetivo del área solicitante al que responde la demanda, con su resultado clave o meta medible cuando exista. Complementa el objetivo estratégico: aquel conecta la demanda con el plan del banco (2.1), y este campo la conecta con el compromiso anual del área que la origina |
| **PARTE B. La completa la Mesa de triage, que conduce el PM de demanda** | |
| **Clasificación oficial** | Grupo: Requerimiento (BAU) · Proyecto. Categoría de requerimiento: Cumplimiento normativo · Evolutivo · Solicitud de información · Mandatos de franquicias · POC / Estimaciones · Requerimientos IT4IT. Categoría de proyecto: Proyectos IT4IT · Proyecto Estratégico · Proyecto Operativo. Etapa: pre-proyecto, si el grupo es Proyecto sin condición de entrada directa (4.1 · 4.2) |
| **Resultado del árbol de decisión** | Respuesta a las preguntas 2 a 4 (sí o no) y factores de complejidad que aplican, por número del 1 al 10 (4.4). Si hubo duda de categoría, la razón de la elección (4.3) |
| **Obligación externa con fecha** | Regulatoria · Franquicia · No aplica. Con la referencia de la norma, el hallazgo o el mandato, y su fecha límite. Alimenta la cartera regulatoria consolidada (7.3) |
| **Origen normativo (4.2)** | Regulador u organismo de control · auditoría externa · auditoría interna · no aplica. Norma, artículo o hallazgo · ente emisor · fecha de notificación · documento de origen en el expediente (9.0.4) |
| **Verificación de Cumplimiento (4.2)** | Confirmado · no confirmado · pendiente, con fecha y responsable. Parte del alcance que es normativa |
| **Condición de entrada directa (solo proyecto)** | Presupuesto asignado en el plan anual · mandato regulatorio verificado por Cumplimiento · mandato del Directorio, con su referencia. Sin una de ellas, la demanda se clasifica como pre-proyecto (4.1) |
| **Urgencia (Mesa de triage)** | Baja · Media · Alta · Crítica. Es la urgencia validada por el triage frente a la declarada por el área solicitante en la Parte A; si difieren, se deja constancia de la razón |
| **Ruta asignada** | Marco 1: backlog de requerimientos de la Mesa de Demanda, incluidos los pre-proyectos · Marco 2: Comisión de proyectos, solo entrada directa (4.1) |
| **¿Se puede clasificar con lo registrado?** | Sí · No (devolver al área solicitante) |
| **Si es «No», ¿qué información falta?** | Se detalla para que el área solicitante complete y reingrese; sin este detalle la devolución no es trazable (4.4) |
| **Fecha de clasificación o de devolución** | Fecha en que la Mesa de triage clasifica la demanda o la devuelve al área solicitante. Con la fecha de registro, permite controlar los plazos máximos hasta la decisión (11.3) |
| **¿Duplicado de?** | |
| **Responsable asignado** | |
| **Seguimiento vigente** | Etapa actual (triage · análisis · priorización · diferido · ejecución · cierre), responsable de seguimiento y fecha del último traspaso (9.0.1). Complementa el campo Estado; no lo reemplaza |
| **Proyectos que dependen de esta demanda (6.10)** | PRY · fase o hito que la necesita · fecha requerida. Se llena solo si algún proyecto declaró esta demanda como origen de una dependencia |
| **Fecha objetivo / SLA** | Es la fecha comprometida contra la que se calcula el semáforo de plazo (10.2); el umbral de alerta depende de la categoría (11.2) |
| **Estado** | Planificación · En ejecución · En pruebas · Suspendido · Finalizado · Cancelado |
| **PARTE C. La completa el PM de demanda, con el analista de negocio, durante el análisis de Marco 1 (fase 1, 5.3)** | |
| **Observación especializada (Seguridad Bancaria · Gestión de Procesos · Cumplimiento · Arquitectura · Legal · Talento Humano)** | Se registra cuando se activa (5.3): datos personales o información sensible, canal externo, integración con el core o requisito regulatorio; para Legal, proveedor bajo contrato, acuerdo de confidencialidad o interpretación normativa; para Talento Humano, impacto en funciones, cargos, perfiles o capacitación. Es consultiva: la Mesa de Demanda decide con ella a la vista |
| **Datos personales (9.13)** | No trata datos personales · opera sobre un tratamiento ya evaluado (referencia a la evaluación vigente) · activa la evaluación 9.13 |

**Vigencia y taxonomía del campo Estado:** aplica por igual a Marco 1 (requerimientos en sus seis categorías y pre-proyectos) y a Marco 2 (proyectos). La Mesa de triage lo asigna en «Planificación» al clasificar la demanda; de ahí en adelante lo actualizan el PM de demanda en el backlog de requerimientos de Marco 1 (5.3) y el PM de proyecto en la lista de proyectos activos de Marco 2 (6.10).3) cuando gestiona la demanda como analista, y en la lista de proyectos activos de Marco 2 (6.10, que administra la PMO) cuando lidera un proyecto. «Diferido» (bitácora 9.14) es una condición dentro de «Planificación», no un estado aparte. El pre-proyecto validado conserva «Planificación» al pasar a Marco 2 como proyecto propuesto. «Cancelado» cubre un rechazo en priorización (9.2), la devolución por un pronunciamiento desfavorable de la VPEG (8.1) una cancelación durante la ejecución (8.1, «pausar o cancelar proyectos») y la demanda devuelta que no se reingresa en el plazo de 11.3.

## 9.2 Hoja de priorización (scoring simplificado)

**Cuándo se usa:** el PM de demanda la completa en la pre-priorización (fase 1 de Marco 1 y fase 2 de Marco 2; 5.3 · 6.3), y la instancia decide con ella. Tiene dos partes, una por modelo (7.1): la parte A, para los requerimientos (BAU) que prioriza la Mesa de Demanda; la parte B, para los proyectos que prioriza la Comisión de proyectos y para los pre-proyectos que valida la Mesa de Demanda. El aporte de cada fila es calificación × peso; el total es la suma de aportes.

| | |
|---|---|
| **ID y nombre de la demanda / pre-proyecto** | (ej. DEM-2026-0142 o PPY-2026-018; el proyecto propuesto conserva su PPY y el de entrada directa su DEM hasta el acta, 9.0.1) |
| **Objetivo estratégico al que contribuye** | (nombre exacto del objetivo del plan; sin él no se puede calificar el primer criterio con más de 1) |
| **Fecha de evaluación y decisión** | Evaluación: pre-priorización del PM de demanda · decisión: sesión de la instancia |
| **Obligación externa con fecha** | Regulatoria · Franquicia · No aplica (ver 9.1). Si aplica, el puntaje no decide si se hace: la instancia asegura la fecha (7.3) |
| **Modelo aplicado** | Parte A, modelo de requerimientos (7.1.1) · Parte B, modelo de proyectos (7.1.2), también para el pre-proyecto |

**Parte A. Modelo de requerimientos (Mesa de Demanda, 7.1.1)**

| **Criterio (peso)** | **Calif. 1–5** | **Aporte** | **Justificación** |
|---|---|---|---|
| Alineación a objetivo estratégico (0.25) | | | |
| Riesgo de no ejecutar y cumplimiento (0.30) | | | |
| Impacto en el cliente y en el negocio (0.30) | | | |
| Esfuerzo y capacidad (0.15), según la matriz 9.17 | | | |
| **PUNTAJE TOTAL** | | | **Bandas: alta ≈4.0+ · media ≈3.0–3.9 · baja \<3.0. El corte real lo marca la capacidad (7.3 · 7.4). Use las anclas 1/3/5 de 7.1; reserve 2 y 4 para casos intermedios justificados.** |

**Parte B. Modelo de proyectos (Comisión de proyectos y pre-proyectos, 7.1.2)**

| **Criterio (peso)** | **Calif. 1–5** | **Aporte** | **Justificación** |
|---|---|---|---|
| Alineación a objetivo estratégico (0.20) | | | |
| Valor económico / eficiencia (0.20) | | | |
| Riesgo de no ejecutar y cumplimiento (0.15) | | | |
| Impacto en el cliente (0.15) | | | |
| Impacto en el negocio (0.15) | | | |
| Viabilidad y capacidad (0.15), según la matriz 9.17 | | | |
| **PUNTAJE TOTAL** | | | **Bandas: alta ≈4.0+ · media ≈3.0–3.9 · baja \<3.0. El corte real lo marca la capacidad (7.3 · 7.4). Use las anclas 1/3/5 de 7.1; reserve 2 y 4 para casos intermedios justificados.** |

| | |
|---|---|
| **Puntaje del núcleo común (7.1.3)** | Promedio de alineación, riesgo y cumplimiento e impacto (en la parte B, el impacto es el promedio de cliente y negocio). Se usa solo en conflictos entre un requerimiento y un proyecto (7.5) |

| | |
|---|---|
| **Revisión y decisión** | |
| **Revisión de la VPEG (8.1)** | No se pronunció (el ítem sigue a la sesión) · Favorable · Favorable con condiciones · Desfavorable (el ítem vuelve al área solicitante y no entra a la sesión) |
| **Condiciones o justificación de la VPEG** | Se transcriben también en el acta (9.10) |
| **Capacidad según la matriz 9.17** | Alcanza · No alcanza (7.3 · 7.5) · Falta el reporte de un área: no se prioriza, salvo obligación con fecha límite externa (7.4) |
| **Decisión de la instancia** | Prioritario puede ser inmediato o con inicio programado y su fecha (7.3). Mesa de Demanda: prioritario · diferir (9.14) · rechazar; en pre-proyectos: validar y elevar a Marco 2 · diferir · reclasificar · rechazar. Comisión de proyectos: prioritario · diferir · rechazar. Queda en el acta (9.10) |

**Banderas obligatorias:** marque «Riesgo regulatorio/ciber alto» para escalar a la instancia que gobierna la demanda (Mesa de Demanda o Comisión de proyectos, según el marco) aunque su puntaje sea bajo (7.3); «Fecha límite externa» (regulatoria o de franquicia) para aplicar la prioridad de la obligación con fecha externa (7.3) y la excepción de la matriz de capacidades (7.4); «Duplicidad» para evaluar fusión; «Sin sponsor» (pre-proyecto y Marco 2) o «Sin dueño funcional» (requerimientos) para bloquear la validación o la aprobación (7.3).

## 9.3 Ficha de pre-proyecto y caso de negocio ligero

**Cuándo se usa:** es un solo documento que se completa en dos momentos. En Marco 1, el dueño funcional, con apoyo del PM de demanda, completa la parte A para que la Mesa de Demanda valide el pre-proyecto (5.5). En Marco 2, el levantamiento del proyecto completa la parte B sin rehacer la parte A (5.5.4); ahí se suman Administración (CAPEX y OPEX) y el Área Financiera (análisis económico y financiero). El proyecto de entrada directa (4.1) completa las dos partes en el levantamiento. Es una versión corta para decidir, solo tan profunda como el monto lo exija. Si la Comisión de proyectos lo aprueba, da origen al proyecto. **Equivalencia con el formato vigente del banco:** esta ficha es el caso de negocio del marco y se corresponde con el formato institucional REGPESGC001 «Caso de Negocio», elaborado por Gestión de Procesos. Cuando el banco exija el formato institucional, se presenta ese y esta ficha no se llena por separado: basta con que el documento presentado cubra los campos de identificación, portafolio y priorización que se listan abajo y que el formato institucional no contempla. La regla es no duplicar documentos para la misma decisión.

| | |
|---|---|
| **PARTE A. Marco 1: validación de la Mesa de Demanda** | |
| **ID de pre-proyecto / ID de demanda de origen** | (ej. PPY-2026-018 / DEM-2026-0142). En la entrada directa no hay PPY: se registra el DEM (9.0.1) |
| **Nombre del pre-proyecto** | |
| **Sponsor y dueño funcional** | |
| **Problema u oportunidad (con evidencia)** | |
| **Objetivo estratégico al que contribuye** | (ver 2.1) |
| **Categoría de proyecto** | Proyectos IT4IT · Proyecto Estratégico · Proyecto Operativo, asignada en el triage (ver 9.0.3). Indicar también la marca de obligación externa, si aplica (4.2) |
| **Proceso bancario y sistemas afectados** | |
| **Alcance de alto nivel, exclusiones y restricciones** | Exclusiones: lo que queda fuera. Restricciones: condiciones o limitantes impuestas (normativa, imagen institucional, ventana de tiempo) |
| **Requisitos regulatorios aplicables** | Norma o disposición · ente de control · fecha límite de cumplimiento (si existe, ver 7.3) · verificación de Cumplimiento (4.2) |
| **Alcance normativo mínimo (4.2)** | Qué parte del alcance exige la norma y hereda su fecha; qué parte compite con su propio puntaje |
| **Beneficios esperados (medibles)** | Ingresos · ahorro · reducción de riesgo · cumplimiento · experiencia. Cada uno con línea base actual → meta y fecha de medición (se verifica luego en 9.11) |
| **Costo estimado y retorno** | En Marco 1 basta la estimación ROM; si supera el umbral de 6.5.1, la hoja de costo y retorno (9.7) se adjunta en el levantamiento. Si se ejecuta con recursos internos sin inversión adicional, declararlo explícitamente |
| **Plazo estimado e hitos principales** | Plazo preliminar desde la aprobación y lista de hitos macro; se detalla luego en el acta de constitución (9.5) |
| **Recursos requeridos por área** | Áreas y perfiles necesarios (negocio, Medios Tecnológicos, Gestión de Procesos, Legal, Seguridad Bancaria, proveedor externo si aplica). Insumo directo del criterio de capacidad; se contrasta con la matriz de capacidades (7.4 · 9.17) |
| **Riesgos principales y de no ejecutar** | |
| **Dependencias y fecha requerida (justificada)** | |
| **Criterios de conversión que cumple (5.5.1)** | Presupuesto · cronograma · equipo · riesgo · sponsor · beneficio: marcar los que cumple, con una línea de evidencia. Si no cumple los criterios, la Mesa de Demanda lo reclasifica (5.5.3) |
| **Decisión requerida a la Mesa de Demanda** | Validar y elevar a Marco 2 · diferir · reclasificar · rechazar |
| **PARTE B. Marco 2: levantamiento y aprobación de la Comisión de proyectos** | |
| **ID de proyecto (si se aprueba)** | (ej. PRY-2026-031, que asigna la PMO al aprobarse el proyecto y registra en el acta de sesión 9.10) |
| **Alternativas evaluadas** | No hacer nada · mejora menor · proyecto · compra vs. construcción · tercerización |
| **Sostenibilidad** | Cuando el formato institucional lo exija, se adjunta su matriz de criterios ODS; no se reproduce en esta ficha |
| **¿Cambio material respecto de lo validado en Marco 1?** | No · Sí: alcance, costo o plazo. Si es Sí, la VPEG puede volver a revisarlo (8.1). No aplica a la entrada directa |
| **Firmas de responsabilidad** | Según el formato institucional vigente: responsable del área líder, líder del proyecto y las validaciones que ese formato requiera. La aprobación como proyecto la otorga la Comisión de proyectos (8.1); las firmas no la sustituyen, ni la validación de la Mesa de Demanda en Marco 1 |
| **Validación de la alineación estratégica** | Planificación Estratégica: nombre, fecha y resultado. Valida la calificación del primer criterio del modelo de proyectos (7.1.2); no aprueba la inversión, que aprueba la Comisión de proyectos (8.1 · 8.2) |
| **Decisión requerida a la Comisión de proyectos** | Aprobar como proyecto · aprobar con inicio programado (7.3) · diferir · rechazar · reformular |
| **Estado** | Planificación · En ejecución · En pruebas · Suspendido · Finalizado · Cancelado |

## 9.4 Historia de usuario / especificación funcional

**Cuándo se usa:** en todo requerimiento (BAU) de Marco 1, sin excepción, en cualquiera de sus seis categorías. Es el registro funcional común a todas ellas (4.2). Si la historia nace dentro de un proyecto de Marco 2, se asocia a él mediante el ID correspondiente y vive en el backlog de su producto.

**Llenado proporcional.** La plantilla tiene dos bloques. El núcleo es obligatorio para todo requerimiento, porque sin él no se puede saber qué se pidió ni cómo se verifica que quedó bien. El bloque ágil solo se llena cuando el equipo trabaja con backlog y sprints; en una solicitud de información o un ajuste puntual se deja vacío sin culpa, por la regla de datos mínimos de 4.4.

**El núcleo puede vivir dentro del ticket.** Lo que el marco exige es el contenido, no un documento aparte. Si la herramienta ITSM del banco ya captura rol, necesidad, beneficio y criterio de aceptación en el propio ticket, ese registro es la historia de usuario y no se abre un segundo artefacto. Duplicar el mismo dato en dos herramientas sería el antipatrón de 12.2, no un control adicional.

**Núcleo obligatorio**: todo requerimiento, en las seis categorías.

| | |
|---|---|
| **ID de historia / producto al que pertenece** | (ej. HU-CORE-0231 · Core bancario) |
| **Demanda de origen** | DEM-AAAA-NNNN (9.1). Obligatorio: toda historia hereda el ID de la demanda que la origina (9.0.1). |
| **Proyecto o pre-proyecto asociado (si aplica)** | (ej. PRY-2026-031 · PPY-2026-018) |
| **Como \[rol\]… quiero \[funcionalidad\]… para \[beneficio\]** | En una Solicitud de información basta una línea: qué dato, para quién y para qué |
| **Criterios de aceptación** | Dado / Cuando / Entonces. En POC / Estimaciones, el criterio con el que la hipótesis se da por probada o descartada. |
| **Requisitos no funcionales y reglas de negocio** | Rendimiento · seguridad · disponibilidad · datos |
| **Estado** | Planificación · En ejecución · En pruebas · Suspendido · Finalizado · Cancelado |

**Bloque ágil**: solo si el equipo trabaja con backlog y sprints. Se deja vacío en el resto de los casos.

| | |
|---|---|
| **Estimación (puntos / esfuerzo)** | |
| **Definición de terminado (DoD)** | |
| **Backlog y sprint o iteración asignada** | |
| **Prioridad en el backlog de producto** | La define el dueño funcional; la registra el analista de negocio |

**Bloque «POC / Estimación»**: solo en esa categoría (5.6). Se llena en la fase 1, antes de priorizar.

| | |
|---|---|
| **Tipo** | POC · Estimación |
| **Hipótesis o pregunta** | POC: qué se quiere probar. Estimación: qué se quiere dimensionar y con qué precisión |
| **Criterio de éxito o base de estimación** | POC: criterio medible, definido antes de empezar. Estimación: analogía, descomposición o juicio experto |
| **Alcance y exclusiones** | |
| **Datos y entorno** | Entorno aislado; datos anonimizados, seudonimizados o sintéticos (6.9) |
| **Plazo y costo** | Hasta 6 semanas (POC) o 2 semanas (Estimación); costo estimado y si usa licencia de prueba o contrato vigente |

## 9.5 Acta de constitución del proyecto

**Cuándo se usa:** formaliza el inicio del proyecto tras la aprobación. Nombra sponsor, PM de proyecto y gobierno. Mucho de su contenido se hereda de la ficha 9.3: no se reescribe, se referencia.

| | |
|---|---|
| **ID de proyecto / ID de pre-proyecto de origen** | (ej. PRY-2026-031 / PPY-2026-018; en la entrada directa, el DEM de origen) |
| **Nombre del proyecto** | |
| **Sponsor y PM de proyecto** | |
| **Objetivo y justificación** | (referencia a la ficha 9.3) |
| **Alcance de alto nivel y exclusiones** | |
| **Entregables e hitos clave con fechas objetivo** | |
| **Dependencias: hitos que este proyecto necesita (6.10)** | Origen (PRY o DEM) · hito · fecha comprometida → fase o hito propio que lo necesita |
| **Dependencias: hitos propios de los que dependen otros (6.10)** | Hito · fecha comprometida → proyecto dependiente (PRY) y fase o hito que lo necesita |
| **Fecha fin comprometida** | Línea base (esta acta): \_\_\_\_ · Vigente (tras cambios aprobados): \_\_\_\_. Base del semáforo de plazo (10.2) |
| **Presupuesto autorizado (CAPEX/OPEX)** | |
| **Equipo, áreas involucradas y modalidad** | Tradicional · célula dedicada · con proveedor (6.8) |
| **Riesgos iniciales** | |
| **Criterios de éxito y beneficios comprometidos** | |
| **Gobierno y frecuencia de reporte** | Frecuencia del informe de estado (9.18); como mínimo mensual |
| **Aprobaciones (nombre / cargo / fecha)** | |

**Resultado del Discovery (6.3.1)**: obligatorio en Proyecto Estratégico y Proyecto Operativo; en Proyectos IT4IT, cuando se realiza.

| | |
|---|---|
| **Qué sí va en el proyecto** | |
| **Qué no va en el proyecto** | |
| **Pendientes por definir** | Tema · responsable · fecha. Se cierran en la etapa 1 de ejecución (5.7) |
| **Revisión preventiva del laboratorio QA** | Claridad · impactos · testabilidad · escenarios · datos y ambientes · necesidades de pruebas, con sus observaciones |
| **Criterio para avanzar** | Requerimiento claro, completo, consistente, trazable y testeable: Sí / No. Sin «Sí» no se firma el acta |
| **Participantes y fecha** | |

## 9.6 Matriz de riesgos del proyecto

**Cuándo se usa:** se mantiene viva durante todo el proyecto. Probabilidad e impacto se califican de 1 a 5; la exposición es su producto. Los riesgos (R1, R2…) se numeran dentro del proyecto al que pertenecen.

| | |
|---|---|
| **ID y nombre del proyecto** | (ej. PRY-2026-031) |
| **Fecha de actualización** | |

| **ID** | **Descripción del riesgo** | **Prob. (1–5)** | **Imp. (1–5)** | **Exposición** | **Mitigación / dueño / fecha** |
|---|---|---|---|---|---|
| R1 | | | | | |
| R2 | | | | | |
| R3 | | | | | |

*Categorías sugeridas: negocio, tecnología, datos, seguridad, continuidad, regulatorio, proveedor, capacidad.*

## 9.7 Hoja de costo y retorno (TCO simple · ROI · payback)

**Cuándo se usa:** para inversiones medias y altas (6.5.1), en el levantamiento del proyecto (fase 1, 6.3). El área solicitante, con el sponsor, aporta el volumen potencial de negocio y las variables de ahorro (bloques 1 y 2); Administración estima el CAPEX y el OPEX (bloques 3 y 4); y el Área Financiera hace el análisis económico y financiero, sin validar la viabilidad. Las filas de VAN/TIR se completan solo si la Comisión de proyectos lo exige.

**Cómo se lee:** como un cálculo. Primero los supuestos de negocio (bloques 1 y 2) y los costos (bloques 3 y 4); de ellos sale la tabla de TCO, beneficios y flujo neto; y de esa tabla, los resultados. En cada bloque se llenan solo los rubros que apliquen.

| | |
|---|---|
| **ID y nombre del proyecto / pre-proyecto** | (ej. PRY-2026-031 o PPY-2026-018) |
| **Horizonte de análisis y moneda** | (ej. 3 años · USD) |

**1. Volumen potencial de negocio**: obligatorio cuando el proyecto declara ingresos como beneficio; opcional en el resto, por ejemplo en un Proyecto IT4IT o en uno de origen normativo.

| | |
|---|---|
| **Métrica** | Dólares · transacciones · clientes u otra métrica relevante |
| **Volumen actual** | |
| **Volumen potencial esperado y plazo** | (ej. +15 % de transacciones en 12 meses) |
| **Fuente del dato** | |

**2. Variables de ahorro esperadas**: mejoras cuantificables, como ahorro de horas hombre, reducción de pago a proveedores u optimización de procesos. Alimentan la fila de beneficios y se verifican después en el seguimiento de beneficios (9.11).

| **Variable** | **Línea base** | **Meta** | **Ahorro anual (USD)** | **Supuesto o fuente** |
|---|---|---|---|---|
| | | | | |
| | | | | |

**3. CAPEX**: inversiones requeridas para implementar el proyecto, como desarrollo, infraestructura, licencias, equipos o consultorías.

| **Rubro** | **Monto (USD)** | **Cuándo se ejecuta** |
|---|---|---|
| | | |
| | | |

**4. OPEX**: costos recurrentes de operación y mantenimiento, como personal, franquicias, soporte, licencias, servicios o mantenimiento.

| **Rubro** | **Monto anual estimado (USD)** |
|---|---|
| | |
| | |

**TCO, beneficios y flujo neto**

| **Concepto** | **Año 0** | **Año 1** | **Año 2** | **Año 3** | **Total** |
|---|---|---|---|---|---|
| (–) Adquisición / implementación: CAPEX, bloque 3 | | | | | |
| (–) Licencias, operación y soporte: OPEX, bloque 4 | | | | | |
| **(=) TCO simple del período** | | | | | |
| (+) Beneficios: ahorro / ingresos / riesgo evitado, bloques 1 y 2 | | | | | |
| (=) Flujo neto y acumulado | | | | | |

| | |
|---|---|
| **ROI del período** | ROI = (Beneficio acumulado − Inversión) / Inversión |
| **Payback** | Momento en que el acumulado iguala la inversión |
| **Costo de no hacer** | |
| **VAN (solo si la Comisión de proyectos lo exige)** | Con la tasa de descuento única del banco |
| **TIR (solo si la Comisión de proyectos lo exige)** | Se compara con la tasa de descuento única del banco |
| **Total CAPEX (bloque 3)** | Suma del bloque 3. El Área Financiera indica qué parte se capitaliza |
| **Total OPEX anual (bloque 4)** | Suma anual del bloque 4. El Área Financiera confirma su registro como gasto |

## 9.8 Plan de transición a producción y cambio

**Cuándo se usa:** es la evidencia de las etapas de certificación e implementación (5.7) del subproceso de despliegue de cada marco: «Desplegar y validar» en Marco 1 (fase 4, 5.3) y «Transición a producción» en Marco 2 (fase 5, 6.3). Es requisito antes de liberar a producción. Integra el control de cambios productivo (ITIL change enablement). Se identifica con el ID del proyecto que lo origina o, si proviene de un requerimiento de Marco 1, con el ID de la demanda; al aprobarse el cambio puede recibir además un ID de cambio (CHG) del sistema ITSM. Si el cambio de alcance que lo motiva tuvo identificador propio del marco (CHG-PRY en 6.6 o CHG-DEM en 5.4), se referencia aquí para cerrar la trazabilidad entre la decisión y el despliegue. **Llenado proporcional:** en un ajuste puntual de bajo riesgo con un procedimiento de despliegue ya estandarizado por Medios Tecnológicos, ese procedimiento hace las veces de plan; basta registrar el ID de cambio, la fecha de despliegue, la aprobación y la conformidad del dueño funcional en el propio ticket.

**Cadena de aceptación:** los criterios se definen en la historia de usuario (9.4) o en el alcance del acta (9.5); se verifican y aceptan en este plan, antes de salir a producción; y la satisfacción se confirma después, en la ficha de cierre 9.15 en Marco 1 o en el acta de cierre 9.19 en Marco 2 (6.3).

| | |
|---|---|
| **ID y nombre del proyecto, la demanda o el release** | (ej. PRY-2026-031 · DEM-2026-0142) |
| **ID de cambio (CHG) si aplica y fecha de despliegue** | |
| **Informe de certificación (Seguridad Bancaria · Gestión de Procesos · Cumplimiento · Arquitectura)** | Adjunto · observaciones resueltas / mitigadas / aceptadas como riesgo residual por el sponsor, o por el dueño funcional en Marco 1, verificado por la PMO (6.7) |

| **Ítem de verificación** | **Estado / responsable** |
|---|---|
| Pruebas funcionales y UAT aprobadas | Responde: dueño funcional, con el analista de negocio |
| Revisión de seguridad (concepto emitido) | Responde: Seguridad Bancaria |
| Continuidad: respaldo, monitoreo y soporte | Responde: Medios Tecnológicos |
| Migración / calidad de datos validada | Responde: Medios Tecnológicos, con el dueño funcional |
| Capacitación a usuarios | Responde: equipo asignado, con el área solicitante |
| Plan de despliegue, ventana y rollback | Responde: Medios Tecnológicos |
| Comunicación y soporte post-producción (hypercare) | Responde: equipo asignado; Mesa de Servicio para el soporte |
| Aprobación del cambio productivo | Responde: Medios Tecnológicos, por su control de cambios |

**Aceptación para el pase a producción**: obligatoria antes de liberar, en los dos marcos.

| | |
|---|---|
| **Evidencia de UAT** | Casos ejecutados y aprobados · defectos abiertos por severidad. No se pasa a producción con defectos críticos abiertos |
| **Conformidad del dueño funcional** | Nombre, fecha y medio: firma o aprobación en la herramienta ITSM. Se da contra los criterios de aceptación de 9.4 o el alcance del acta 9.5 |
| **Observaciones abiertas aceptadas como riesgo residual** | Las acepta el sponsor en Marco 2 y el dueño funcional en Marco 1 (6.7) |
| **Decisión de pase a producción** | Sale · no sale · sale con condiciones. Marco 1: responsable asignado con el dueño funcional. Marco 2: PM de proyecto con el sponsor. La aprobación del cambio productivo sigue siendo de Medios Tecnológicos |
| **Criterio de salida del hypercare** | Duración y condición para darlo por terminado, por ejemplo dos semanas sin incidentes críticos. En Marco 2 se enlaza con el cierre del proyecto (6.3) |

## 9.9 Solicitud de control de cambios

**Cuándo se usa:** cuando un proyecto en ejecución necesita un cambio de alcance, tiempo o costo, o cuando un reproceso o evento obliga a replantear algo. Cada solicitud recibe un ID propio ligado al proyecto (6.6).

| | |
|---|---|
| **ID del cambio / ID del proyecto** | CHG-PRY-AAAA-NNN-NN (ej. CHG-PRY-2026-031-01) |
| **Solicitante y fecha** | |
| **Tipo de cambio** | Alcance · Tiempo · Costo · Reproceso por calidad · Suspensión por conflicto de capacidad (7.5) · Replanteo / cancelación |
| **Descripción y motivo** | Requisito regulatorio · cambio de negocio · error · estimación insuficiente · riesgo materializado |
| **Impacto en alcance, cronograma y costo** | |
| **¿Modifica la fecha fin comprometida?** | No · Sí → nueva fecha vigente: \_\_\_\_ (genera nueva línea base en 9.5; la original se conserva, ver 10.2. No aplica a una suspensión por conflicto de capacidad: su fecha se rige automáticamente por el mecanismo de 10.2, sin nueva línea base) |
| **¿Afecta un hito de enganche (6.10)?** | No · Sí → hito, nueva fecha y proyectos dependientes avisados |
| **¿Afecta riesgo, seguridad o arquitectura?** | Sí / No (si es Sí, concepto previo de la revisión técnica 12.3) |
| **¿Requiere re-priorización (sección 7)?** | Sí / No |
| **Magnitud** | Menor · Moderado · Mayor · Contrato (afecta contrato de proveedor) |
| **Resultado y aprobado por (según magnitud)** | Aprobado · Rechazado · Con condiciones · Diferido. Aprueba, según magnitud: PM de proyecto · sponsor + PM de proyecto · Comisión de proyectos · Administración + Comisión de proyectos |
| **Actualizaciones requeridas** | Plan (9.5) · riesgos (9.6) · costo y retorno (9.7) · transición (9.8) |

## 9.10 Acta de sesión con decisiones

**Cuándo se usa:** cierra cada sesión de la Mesa de Demanda y de la Comisión de proyectos, y de la Mesa de triage cuando hay escalamiento (8.1), dejando por escrito qué se decidió. Su utilidad real es evitar el problema más común de estas instancias: que se reúnan, conversen y la cartera quede exactamente igual que antes.

| | |
|---|---|
| **Instancia / fecha / asistentes y quórum (8.1)** | |
| **Demandas, pre-proyectos y proyectos revisados** | |
| **ID de proyecto asignado (solo Comisión de proyectos)** | PRY-AAAA-NNN de cada proyecto aprobado en la sesión, junto a su PPY o DEM de origen (9.0.1) |
| **Decisiones (aprobar · priorizar · aprobar con inicio programado, con su fecha y la capacidad comprometida en 9.17 · diferir · rechazar · fusionar · cancelar · validar y elevar a Marco 2 · reclasificar · corregir categoría · elevar a la Comisión de proyectos)** | |
| **Justificación de cada decisión** | |
| **Presupuesto comprometido** | Comisión de proyectos: inversión aprobada por proyecto. Mesa de Demanda: presupuesto de requerimientos con proveedor, dentro de los niveles de autorización del banco (8.1) |
| **Revisiones de la VPEG** | Ítem · resultado · condiciones. Los ítems con pronunciamiento desfavorable no se tratan: se registran como devueltos al área solicitante (8.1) |
| **Matriz de capacidades (9.17)** | Áreas que reportaron · áreas sin reporte y su consecuencia · perfiles en saturación estructural y recomendación al dueño del área (7.4) |
| **Cartera regulatoria consolidada (solo Comisión de proyectos)** | Revisada · casos que la Comisión de proyectos pide elevar (7.3) |
| **Acuerdos, responsables y fecha de seguimiento** | |

## 9.11 Seguimiento de beneficios (post-implementación)

**Cuándo se usa:** cierra el ciclo. Se completa después de poner en producción, para verificar si los beneficios prometidos en la ficha 9.3 y la hoja 9.7, incluidas sus variables de ahorro, se cumplieron de verdad. La completa el sponsor con el PM de proyecto en la fase 6 (6.3), y la valida el Área Financiera, que confirma el resultado real frente a la meta que ayudó a fijar en el levantamiento. Evita los cierres cosméticos.

| | |
|---|---|
| **ID y nombre del proyecto** | (ej. PRY-2026-031) |
| **Fecha de medición post-implementación** | |
| **Validado por Área Financiera (nombre y fecha)** | |

| **Beneficio comprometido** | **Línea base** | **Meta (fijada en el levantamiento)** | **Real medido** | **Dueño / fecha** |
|---|---|---|---|---|
| | | | | |
| | | | | |

| | |
|---|---|
| **Desviación vs. lo comprometido y sus causas** | |
| **Decisión (continuar, ajustar, descontinuar)** | |
| **Lecciones para futuras estimaciones** | |

## 9.12 Ficha de proveedor (simplificada)

**Cuándo se usa:** cuando un proyecto de Marco 2 (6.8.2) o una demanda de Marco 1 (5.3) se ejecuta total o parcialmente con un proveedor que hay que seleccionar y contratar. La ficha se abre en la fase 1, cuando Administración firma el acuerdo de confidencialidad para solicitar cotizaciones (6.8.2); Administración selecciona y contrata al proveedor en la fase de inicio y planificación del marco que corresponda. Sirve para seleccionar, contratar y supervisar al proveedor, vinculado al proyecto o a la demanda por su ID. Si un proveedor atiende la demanda con cargo a un contrato vigente (5.5.1), no se abre una ficha nueva: se referencia la del contrato.

| | |
|---|---|
| **ID del proveedor / proyecto o demanda asociada** | PROV-AAAA-NNN · PRY-AAAA-NNN o DEM-AAAA-NNNN |
| **Proveedor y servicio o entregable contratado** | |
| **Acuerdo de confidencialidad (NDA)** | Fecha de firma, alcance y vigencia. Se firma antes de solicitar cotizaciones o de iniciar una POC, y se registra aunque el proveedor no sea contratado (6.8.2) |
| **Justificación make-or-buy** | Por qué se contrata en lugar de hacer interno |
| **Evaluación (1–5 cada uno)** | Capacidad técnica · solidez financiera · seguridad y datos · cumplimiento · costo · soporte |
| **Cláusulas verificadas en contrato** | SLA con penalidades · confidencialidad y datos · auditoría · propiedad intelectual · salida (exit) · subcontratación · notificación de incidentes · escrow si es crítico |
| **Responsable interno de supervisión** | |
| **Riesgos del proveedor (enlazar a 9.6)** | |
| **Cierre: transferencia, retiro de accesos y evaluación** | |

## 9.13 Evaluación de impacto en datos y privacidad (simplificada)

**Cuándo se usa:** en toda demanda (requerimiento de cualquier categoría, pre-proyecto o proyecto) que introduzca un tratamiento de datos personales nuevo, cambie la finalidad de uno existente, incorpore datos sensibles o perfilamiento, o abra transferencia a terceros o fuera del país. El disparador es la naturaleza del tratamiento, no el marco por el que se tramita la demanda ni su tamaño: la obligación legal nace del tratamiento y no distingue entre un proyecto y un evolutivo. En Marco 1 se completa durante el análisis (fase 1, 5.3); en Marco 2, durante la planificación (6.9), y se revisa en la revisión técnica temprana (12.3). El pre-proyecto declara en Marco 1 si activa la evaluación (9.1, parte C) y la completa ya como proyecto, en la planificación de Marco 2. Equivale a la EIPD de la LOPDP.

**Cuándo NO se usa:** cuando la demanda opera sobre un tratamiento ya evaluado sin alterar su finalidad, las categorías de datos ni los destinatarios: una corrección de cálculo, un cambio de presentación o una mejora de rendimiento sobre datos que ya se tratan con la misma finalidad. En esos casos basta declararlo en la ficha 9.1 (parte C) y referenciar la evaluación vigente, sin repetirla. La regla aplica por igual a los dos marcos: un proyecto que reutiliza un tratamiento ya evaluado tampoco rehace la ficha.

**Registro de tratamientos evaluados:** lo mantiene la PMO junto con el oficial de protección de datos. Es una lista de los tratamientos ya evaluados, con su evaluación vigente, publicada donde el PM de demanda la consulta en la fase 1, al completar la parte C de la ficha 9.1. Así se aplica la excepción de no repetir la evaluación sobre un tratamiento ya evaluado, sin saltársela sin control.

**Quién decide con ella:** la evaluación la completa Seguridad Bancaria con el oficial de protección de datos; la instancia de gobierno decide con ella a la vista y no la sustituye. En Marco 1 resuelve la Mesa de Demanda en todos los casos, cualquiera sea el resultado: el requerimiento se gobierna en su propia instancia y no cambia de marco por un hallazgo de privacidad, porque a Marco 2 solo se pasa por la validación de un pre-proyecto (5.5) o por la reclasificación por crecimiento de alcance (5.4). En Marco 2 decide la Comisión de proyectos. Lo que cambia en los supuestos de mayor exposición (resultado «requiere rediseño», datos sensibles, perfilamiento o decisiones automatizadas, o transferencia a terceros o fuera del país) no es la instancia, sino el carácter del pronunciamiento: en ellos la instancia no puede aprobar sin el pronunciamiento favorable expreso del oficial de protección de datos.

**Si el oficial de protección de datos se opone:** la demanda no avanza y tampoco se eleva a otra instancia. Regresa a la etapa de análisis, que es la fase 1 en Marco 1 (5.3) y la planificación en Marco 2 (6.3), para subsanar las observaciones, y vuelve a la instancia que la gobierna una vez subsanadas. No hay comisión de desempate porque no hay empate: la observación se subsana o la demanda se rechaza con justificación registrada en el acta (9.10). Lo que no cabe es aprobarla con la observación pendiente ni dejarla en espera indefinida, por el mismo principio de 6.7: el silencio no es una opción.

**Si los datos salen hacia un tercero.** Cuando la demanda comparte datos personales con un proveedor u otra entidad, el acuerdo de confidencialidad (6.8.2) no basta: se requiere además el contrato de encargo de tratamiento que exige la LOPDP, con las condiciones que fije el oficial de protección de datos.

**Excepción declarada a 6.7.** Este es el único punto del marco en que un área de acompañamiento emite un pronunciamiento vinculante y no meramente consultivo. Se declara aquí de forma expresa para que no se lea como una inconsistencia: el oficial de protección de datos no aporta solo concepto experto, ejerce una responsabilidad legal propia bajo la LOPDP que ninguna instancia interna de priorización puede sustituir. Fuera de los supuestos de mayor exposición enumerados arriba, su participación es consultiva como la del resto de áreas que acompañan.

| | |
|---|---|
| **ID de la demanda / pre-proyecto / proyecto** | Responsable de la evaluación, con apoyo del oficial de protección de datos |
| **Descripción del tratamiento y finalidad** | |
| **Categorías y clasificación de los datos** | Categoría: Personales · financieros · sensibles. Clasificación: Pública · Interna · Confidencial · Restringida |
| **Base legal del tratamiento** | Consentimiento · contrato · obligación legal · interés legítimo |
| **Minimización, conservación y acceso** | ¿Solo lo necesario? · tiempo de retención y borrado · quién accede |
| **¿Transferencia a terceros o fuera del país?** | Proveedor (9.12) · otra entidad · internacional |
| **¿Perfilamiento o decisiones automatizadas?** | Sí / No |
| **¿Datos reales fuera de producción?** | No / anonimizados / seudonimizados / sintéticos |
| **Riesgos para el titular y mitigación** | |
| **¿Permite derechos de acceso/rectificación/eliminación/portabilidad?** | Sí / No |
| **Resultado de la evaluación** | Aceptable · aceptable con condiciones · requiere rediseño |

## 9.14 Bitácora de reevaluación de diferidos

**Cuándo se usa:** para toda demanda, pre-proyecto o proyecto que la Mesa de Demanda o la Comisión de proyectos decide diferir (5.3, 5.5.3 y 6.3). Registra cada reevaluación con su fecha y resultado, para que la cadencia obligatoria (cada 15 días en Marco 1, incluidos los pre-proyectos, cada mes en Marco 2, hasta un máximo de dos reevaluaciones) quede trazada y ninguna demanda quede «en espera indefinida» sin evidencia (el silencio no es una opción, mismo principio de 6.7).

| | |
|---|---|
| **ID diferido** | DEM-AAAA-NNNN · PPY-AAAA-NNN (hereda el ID de origen, 9.0.1). Un proyecto diferido todavía no tiene PRY: lo recibe solo si la Comisión de proyectos lo aprueba |
| **Marco e instancia que difiere** | Marco 1: Mesa de Demanda · Marco 2: Comisión de proyectos |
| **Fecha y motivo de la primera decisión de diferir** | |
| **Cadencia aplicable** | 15 días, máx. 2 reevaluaciones (Marco 1) · 1 mes, máx. 2 reevaluaciones (Marco 2) |

| **N.º reevaluación** | **Fecha programada** | **Resultado** | **Justificación** | **Decide** |
|---|---|---|---|---|
| 1 | | Priorizado (validado, si es pre-proyecto) · Diferido de nuevo · Rechazado · Reclasificado | | |
| 2 (última posible) | | Priorizado (validado, si es pre-proyecto) · Rechazado · Reclasificado (decisión obligatoria) | | |

| | |
|---|---|
| **Decisión final si se agotan las reevaluaciones** | Obligatoria: rechazar o reclasificar/reformular alcance; no puede quedar en espera indefinida (5.3 · 6.3 · 6.7) |
| **Registrada en el acta de la instancia (9.10)** | |

## 9.15 Ficha de cierre operativo (Marco 1)

**Cuándo se usa:** cierra la fase 5 de todo requerimiento (BAU), en cualquiera de sus seis categorías (5.3); en POC / Estimaciones incluye el informe de resultado. Los indicadores de la sección 10 miden el agregado mensual; esta ficha deja la evidencia de que cada demanda individual se cerró de verdad.

| | |
|---|---|
| **ID de la demanda / historia de usuario** | DEM-AAAA-NNNN (9.1) · HU-PROD-NNNN (9.4) |
| **Categoría** | Cumplimiento normativo · Evolutivo · Solicitud de información · Mandatos de franquicias · POC / Estimaciones · Requerimientos IT4IT |
| **Resultado de la POC (solo POC / Estimaciones)** | Hipótesis probada · descartada · no concluyente, o estimación entregada. Si se quiere implementar, ID de la demanda nueva vinculada (5.3) |
| **Criterio de éxito frente al resultado y evidencia (solo POC / Estimaciones)** | POC: qué se midió y si cumplió el criterio. Estimación: rango entregado y supuestos (5.6) |
| **Recomendación y decisión (solo POC / Estimaciones)** | Descartar · repetir una sola vez con nueva aprobación de la Mesa de Demanda · convertir en demanda nueva por el triage (4.4) |
| **Fecha de cierre** | |
| **¿Satisfacción del área solicitante validada?** | Sí / No, con comentario |
| **¿Documentación actualizada?** | Sí / No; si es Sí, cuál (manual, base de conocimiento, diccionario de datos) |
| **Indicador de la sección 10 al que aporta** | |
| **¿Expediente completo? (9.0.4)** | Sí / No; si es No, qué falta y quién lo completa |
| **Responsable del cierre** | Área solicitante, que valida + responsable asignado. Gestión de Procesos verifica la evidencia de aceptación y registra el cierre (5.7) |
| **Observaciones o lecciones aprendidas** | |

## 9.16 Documento de definiciones

**Cuándo se usa:** lo levanta Gestión de Procesos al inicio del subproceso de construcción, antes de construir: «Atender y construir» en Marco 1 (fase 4, 5.3) y «Construir y asegurar calidad» en Marco 2 (fase 4, 6.3). Es la evidencia de la etapa 1 de ejecución (5.7): Gestión de Procesos la conduce con el área solicitante y los usuarios impactados, y sin la aprobación del dueño funcional no se inicia el desarrollo. Traduce el qué (el alcance acordado en la ficha 9.3 o en el acta 9.5) al cómo funcional y operativo: reglas de negocio, flujo del proceso afectado, criterios de aceptación y puntos de control. Es el insumo con el que el equipo técnico construye y con el que luego se certifica.

**Cuándo NO se usa:** no aplica a Solicitud de información ni a POC / Estimaciones, que no cambian sistemas en producción. En un ajuste puntual tampoco se exige: basta la historia de usuario (9.4). Es obligatorio en todo proyecto de Marco 2 y en todo requerimiento que modifique una regla de negocio o un proceso bancario; en el resto de los requerimientos, la Mesa de Demanda decide si lo pide. Convive con la 9.4 y no la sustituye: la historia de usuario expresa la necesidad, este documento define su comportamiento.

| | |
|---|---|
| **ID de la demanda o del proyecto** | DEM-AAAA-NNNN (9.1) · PRY-AAAA-NNN (9.5) |
| **Proceso bancario afectado y sistemas involucrados** | |
| **Situación actual (as-is) resumida** | Solo lo necesario para entender el cambio; no es un levantamiento completo del proceso |
| **Definición funcional (to-be)** | Comportamiento esperado, reglas de negocio y excepciones |
| **Actores y puntos de control del proceso** | Quién ejecuta, quién valida, dónde queda evidencia |
| **Reglas de validación y manejo de errores** | |
| **Datos: campos, origen y tratamiento** | Si trata datos personales, se activa la evaluación de privacidad (9.13) |
| **Interfaces e integraciones** | Sistemas de origen y destino, dependencias con terceros |
| **Criterios de aceptación** | Verificables; son la base de las pruebas y de la certificación previa al despliegue (6.7) |
| **Impacto operativo en el área solicitante** | Cambios en la operación diaria, documentación o capacitación necesarios |
| **Elaborado por / validado por** | Gestión de Procesos / dueño funcional |

## 9.17 Matriz de capacidades por área

**Cuándo se usa:** la actualiza cada área que ejecuta o acompaña (Medios Tecnológicos, incluida Arquitectura; Gestión de Procesos; Seguridad Bancaria y Riesgos) antes de cada sesión de la Mesa de Demanda y de la Comisión de proyectos. La PMO la consolida y la presenta como insumo obligatorio de la sesión (7.4): sin matriz vigente de todas las áreas, la sesión no prioriza, salvo la demanda con obligación externa con fecha límite (7.4). Sirve de base para calificar los criterios «Esfuerzo y capacidad» y «Viabilidad y capacidad» (7.1), aplicar la regla «Sin capacidad real» (7.3) y resolver los conflictos de capacidad (7.5).

**Cabecera.**

| | |
|---|---|
| **Área y equipo o célula** | ej. Medios Tecnológicos, célula Canales |
| **Período y fecha de corte** | Semana o mes que cubre; fecha en que se actualizó |
| **Horizonte de proyección** | Mínimo tres meses hacia adelante, para poder fijar inicios programados (7.3) |
| **Responsable del reporte** | |
| **Capacidad total del período** | Horas-persona disponibles, ya descontadas las ausencias conocidas |
| **Restricciones conocidas** | Congelamientos, cierres contables, auditorías, vacaciones colectivas |

**Capacidad comprometida** (una fila por ítem).

| **Ítem (ID)** | **Categoría** | **Horas-persona** | **Desde** | **Hasta** | **Estado** |
|---|---|---|---|---|---|
| DEM / PPY / PRY | Categoría de requerimiento · Pre-proyecto · Categoría de proyecto (sección 4) | | | | Planificación · En ejecución · En pruebas · Suspendido |
| | | | | | |

**Resumen y demanda en agenda.**

| | |
|---|---|
| **Capacidad comprometida y disponible** | Suma de la tabla anterior; disponible = total − comprometida |
| **Ocupación del período** | Comprometida / total, en % |
| **Ventanas de cambio comprometidas** | Fechas y sistemas |
| **Perfiles críticos saturados** | Perfiles sin disponibilidad en el período y cuántos meses consecutivos llevan saturados (7.4) |
| **Capacidad comprometida a futuro** | Ítems aprobados con inicio programado: ID, fecha de inicio y horas-persona reservadas por período (7.3) |
| **Ítems en agenda que requieren esta área** | ID y horas-persona estimadas (de 9.3 o de la estimación de la fase 1), para que la instancia vea si caben |

## 9.18 Informe de estado del proyecto

**Cuándo se usa:** lo emite el PM de proyecto desde el inicio de la ejecución (fase 4) hasta el fin de la transición a producción (fase 5), con la frecuencia que fija el acta de constitución (9.5). Como mínimo se emite una vez al mes y antes de cada sesión de la Comisión de proyectos. Lo recibe el sponsor, y la PMO lo verifica y lo consolida en la lista de proyectos activos (6.10) y en el reporte agregado (8.3). El último informe es insumo del cierre (fase 6).

**Cuándo NO se usa:** no aplica a los requerimientos de Marco 1, que se siguen con el backlog y el semáforo (10.2). Tampoco reemplaza a la solicitud de cambio: si el informe muestra una desviación que supera los umbrales de 6.6, el PM de proyecto abre la solicitud 9.9.

**Llenado.** El informe resume y no reescribe. Cada campo toma su dato de un instrumento que ya existe y lo cita. El semáforo de plazo se calcula (10.2) y no se elige; el informe no agrega un color general de opinión.

| | |
|---|---|
| **ID y nombre del proyecto / período del informe** | PRY-AAAA-NNN · desde / hasta |
| **Sponsor y PM de proyecto** | |
| **Estado y fase actual** | Estado del campo de 9.1 · fase 4 o 5 (6.3) y frentes en curso: gestión, construcción, supervisión del contrato |
| **Semáforo de plazo (10.2)** | Verde · Amarillo · Rojo · Sin fecha. Fecha fin de línea base y vigente, y número de reprogramaciones aprobadas |
| **Presupuesto** | Autorizado (9.5) · ejecutado a la fecha · proyección al cierre · desviación en % |
| **Riesgos principales (9.6)** | Los de mayor exposición, los que cambiaron en el período y los que se materializaron |
| **Cambios (9.9)** | Solicitudes abiertas y resueltas en el período, con su ID y resultado |
| **Dependencias (6.10)** | Estado y semáforo de cada hito de enganche: hitos de otros proyectos o requerimientos que el proyecto necesita, y hitos propios de los que dependen otros |
| **Proveedor (9.12), si aplica** | Cumplimiento del contrato y de los SLA; observaciones del área solicitante en su supervisión funcional |
| **Alertas de las áreas especializadas (6.7)** | Alertas abiertas y respuesta pendiente de la instancia |
| **Decisiones que se requieren** | Qué se pide, a quién (sponsor o Comisión de proyectos) y para cuándo |
| **Próximos hitos** | Lo que se espera cumplir en el período siguiente |

**Avance de hitos.**

| **Hito** | **Fecha comprometida** | **Fecha real o prevista** | **Estado** |
|---|---|---|---|
| | | | Cumplido · En curso · Atrasado |
| | | | |

## 9.19 Acta de cierre de proyecto

**Cuándo se usa:** cierra la fase 6 de todo proyecto de Marco 2 (6.3), sea que termine con su alcance entregado o que se cancele o cierre en forma anticipada por decisión de la Comisión de proyectos. Es el equivalente de proyecto de la ficha 9.15. Deja en un solo documento, firmado, lo que se entregó frente a lo comprometido, lo que queda pendiente y quién lo asume, y cómo se seguirá midiendo el beneficio, que suele madurar después del cierre (9.11).

**Cuándo NO se usa:** no aplica a los requerimientos de Marco 1, que cierran con la ficha 9.15. No reemplaza al seguimiento de beneficios (9.11) ni al cierre del contrato (9.12): los cita y deja constancia de su estado.

**Llenado.** Igual que el informe de estado (9.18), el acta resume y no reescribe: cada campo toma su dato del instrumento que corresponde y lo cita. La prepara el PM de proyecto; la PMO verifica el expediente antes de la firma (9.0.4).

| | |
|---|---|
| **ID y nombre del proyecto** | PRY-AAAA-NNN · nombre · categoría (9.0.3) · origen normativo y marca de obligación externa, si aplican (4.2) |
| **Sponsor y PM de proyecto** | |
| **Tipo de cierre** | Completado · cancelado · cierre anticipado por decisión de la Comisión de proyectos, con referencia al acta de sesión (9.10) |
| **Alcance entregado frente al comprometido** | Frente al acta 9.5 y a los cambios aprobados (9.9). Pendientes: qué queda fuera, quién lo asume y con qué demanda nueva (DEM) se registra |
| **Plazo** | Fecha fin de línea base · fecha fin vigente · fecha real de cierre · color final del semáforo (10.2) |
| **Costo** | Presupuesto autorizado frente a ejecutado, CAPEX y OPEX, con la explicación de la desviación (9.7) |
| **Cambios aprobados** | Cantidad y principales solicitudes, con su ID (9.9) |
| **Pase a producción y aceptación** | Fecha, conformidad del dueño funcional y salida del hypercare (9.8) |
| **Riesgos y alertas abiertas** | Riesgos residuales aceptados por el sponsor y alertas de las áreas especializadas, con su tratamiento (6.7 · 9.6) |
| **Transferencia a la operación** | Dueño operativo · soporte · documentación entregada · capacitación realizada |
| **Proveedor y contrato, si aplica** | Contrato cerrado y obligaciones que siguen vigentes, como la confidencialidad (6.8.2 · 9.12) |
| **Dependencias** | Hitos de enganche propios cumplidos y proyectos dependientes informados (6.10) |
| **Beneficios** | KPI comprometidos, primera medición si existe, próximas fechas de medición y responsable (9.11) |
| **Lecciones aprendidas** | Qué repetir y qué evitar; se comparten con la PMO para la mejora del marco (12.4) |
| **Expediente** | ¿Completo y archivado? Sí / No (9.0.4) |
| **Firmas (nombre / cargo / fecha)** | Sponsor · PM de proyecto · PMO. El Área Financiera firma la conformidad del costo ejecutado y Gestión de Procesos, la verificación de la evidencia de aceptación (5.7). Se informa a la Comisión de proyectos en su siguiente sesión |

