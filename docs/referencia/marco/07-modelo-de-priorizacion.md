# 7. Modelo de priorización

El marco usa dos modelos de priorización, uno por instancia. La Mesa de Demanda prioriza los requerimientos (BAU) con un modelo corto de cuatro criterios, porque es demanda de mayor rotación y menor nivel de gobierno, y no justifica un análisis financiero por ítem. La Comisión de proyectos prioriza los proyectos con el modelo completo de seis criterios, que incluye el valor económico respaldado en la hoja de costo y retorno (9.7). La prioridad se sustenta en criterios comparables, no en quién defiende mejor su caso en la reunión.

Los dos modelos comparten la misma escala, las mismas anclas, las mismas bandas y un núcleo común de tres criterios. Así, cuando un requerimiento y un proyecto compiten por la misma capacidad, se pueden comparar sin traducir un puntaje al otro (7.1.3).

**¿Quién inicia la priorización?** El área solicitante origina la demanda y aporta la información, pero la priorización la inicia y ejecuta la instancia correspondiente (Mesa de Demanda o Comisión de proyectos), no el área solicitante. El PM de demanda prepara la pre-priorización con el modelo que corresponde (5.3 · 6.3) y la instancia decide.

## 7.1 Criterios y pesos

**Reglas comunes a los dos modelos.** Cada criterio se califica de 1 a 5. Solo se usan los valores 1, 3 y 5 como anclas descritas en las tablas; 2 y 4 se reservan para los casos intermedios que el evaluador debe justificar por escrito. El criterio de capacidad se califica con la matriz de capacidades vigente (9.17), no por percepción (7.4). Puntaje total = Σ (calificación 1–5 × peso).

**Salvaguarda:** toda demanda con riesgo regulatorio o de ciberseguridad alto se escala a la instancia que la gobierna aunque su puntaje no sea alto, con la regla de visibilidad que detalla 7.3.

### 7.1.1 Modelo de requerimientos (Mesa de Demanda)

Se aplica a los requerimientos (BAU) de las seis categorías. Fusiona el impacto en el cliente y en el negocio en un solo criterio y reemplaza el valor económico por el esfuerzo, porque en esta escala el PM de demanda estima esfuerzo, no retorno.

| **Criterio** | **Peso** | **1 (mínimo)** | **3 (intermedio)** | **5 (máximo)** |
|---|---|---|---|---|
| Alineación a objetivo estratégico | 25% | No contribuye a ningún objetivo estratégico del plan (2.1). | Contribuye de forma indirecta o parcial a un objetivo estratégico. | Contribuye de forma directa a un objetivo estratégico nombrado explícitamente. |
| Riesgo de no ejecutar y cumplimiento | 30% | Sin consecuencia relevante si no se atiende. | Consecuencia moderada: hallazgo de auditoría, reproceso manual o riesgo operativo acotado. | Obligación normativa o de franquicia, o riesgo operacional, reputacional o de ciberseguridad alto. |
| Impacto en el cliente y en el negocio | 30% | El cliente no percibe cambio y no mejora ningún indicador interno. | Mejora perceptible en un segmento, un canal o un proceso de un área. | Mejora directa en un servicio crítico para el cliente o mejora significativa y medible en costo, ingreso o eficiencia. |
| Esfuerzo y capacidad | 15% | Esfuerzo alto para su categoría y sin capacidad disponible. | Esfuerzo medio o requiere ajustar capacidad o esperar una ventana de cambio. | Esfuerzo bajo y capacidad disponible ahora. |

**POC / Estimaciones.** El criterio «Impacto en el cliente y en el negocio» se califica por el impacto de la decisión que la POC o la estimación permitirá tomar (5.6).

### 7.1.2 Modelo de proyectos (Comisión de proyectos)

Se aplica a los proyectos propuestos y de entrada directa, en sus tres categorías, y también al pre-proyecto cuando la Mesa de Demanda lo valida, porque lo que se decide es si merece competir como proyecto. La calificación del criterio de alineación la valida Planificación Estratégica (8.1). Separa el impacto en el cliente del impacto en el negocio porque son cosas distintas y a veces opuestas: una mejora puede tener altísimo impacto en el cliente externo sin mover ningún indicador interno, y un proyecto puede ser crítico para el negocio sin que el cliente note nada.

| **Criterio** | **Peso** | **1 (mínimo)** | **3 (intermedio)** | **5 (máximo)** |
|---|---|---|---|---|
| Alineación a objetivo estratégico | 20% | No contribuye a ningún objetivo estratégico del plan (2.1). | Contribuye de forma indirecta o parcial a un objetivo estratégico. | Contribuye de forma directa y crítica a un objetivo estratégico nombrado explícitamente. |
| Valor económico / eficiencia | 20% | Sin beneficio cuantificable o beneficio marginal. | Beneficio estimado moderado, con ROI positivo pero no prioritario (9.7). | ROI alto y cuantificado, payback corto, respaldado en la hoja de costo y retorno (9.7). |
| Riesgo de no ejecutar y cumplimiento | 15% | Sin consecuencia relevante si no se ejecuta. | Consecuencia moderada si no se ejecuta. | Obligación regulatoria con fecha límite, o riesgo operacional/reputacional/ciber alto. |
| Impacto en el cliente | 15% | El cliente externo no percibe ningún cambio. | Mejora perceptible en un segmento o canal específico de clientes. | Mejora directa en experiencia, tiempos o disponibilidad de un servicio crítico para el cliente. |
| Impacto en el negocio | 15% | Sin efecto en indicadores internos de negocio. | Mejora moderada en un proceso o indicador interno de un área. | Mejora significativa y medible en costos, ingresos, eficiencia o cumplimiento interno del banco. |
| Viabilidad y capacidad | 15% | Alta complejidad técnica y sin capacidad disponible. | Complejidad media; requiere ajustar capacidad o esperar ventana de cambio. | Baja complejidad y capacidad de equipo, presupuesto y ventana de cambio disponibles ahora. |

### 7.1.3 Núcleo común para comparar entre marcos

Tres criterios existen en los dos modelos: alineación a objetivo estratégico, riesgo de no ejecutar y cumplimiento, e impacto. El puntaje del núcleo común es el promedio simple de esas tres calificaciones; en el modelo de proyectos, el impacto es el promedio de impacto en el cliente e impacto en el negocio. Se usa solo cuando un requerimiento y un proyecto compiten por la misma capacidad (7.5): la Comisión de proyectos compara los dos ítems por su núcleo común, con la matriz 9.17 a la vista. Dentro de cada marco se compara siempre con el puntaje total del modelo propio.

## 7.2 Ejemplos resueltos

**Requerimiento (modelo de requerimientos):** «Validación de identidad adicional en la originación digital», categoría Evolutivo.

| **Criterio** | **Peso** | **Calif.** | **Aporte** | **Comentario de la Mesa de Demanda** |
|---|---|---|---|---|
| Alineación a objetivo estratégico | 25% | 4 | 1.00 | Entre ancla 3 y 5: contribuye al objetivo de banca digital, aunque no es el núcleo de ese objetivo. |
| Riesgo de no ejecutar y cumplimiento | 30% | 3 | 0.90 | Reduce un riesgo de suplantación ya observado, sin obligación normativa. |
| Impacto en el cliente y en el negocio | 30% | 5 | 1.50 | Reduce rechazos en un canal crítico y el reproceso manual del back office. |
| Esfuerzo y capacidad | 15% | 4 | 0.60 | Entre ancla 3 y 5: esfuerzo bajo; la célula tiene capacidad desde la próxima quincena. |
| **Puntaje total ponderado** | | | **4.00** | **Decisión: banda alta; prioritario si se confirma la capacidad.** |

**Proyecto (modelo de proyectos):** «Implementación de motor antifraude para canal digital», pre-proyecto validado por la Mesa de Demanda, categoría Proyecto Estratégico.

| **Criterio** | **Peso** | **Calif.** | **Aporte** | **Comentario de la Comisión de proyectos** |
|---|---|---|---|---|
| Alineación a objetivo estratégico | 20% | 5 | 1.00 | Contribuye directamente al objetivo estratégico de confianza y seguridad digital del plan. |
| Valor económico | 20% | 4 | 0.80 | Entre ancla 3 y 5: ROI positivo y cuantificado (hoja 9.7). |
| Riesgo de no ejecutar y cumplimiento | 15% | 5 | 0.75 | Expectativa regulatoria de monitoreo de fraude con fecha de cumplimiento. |
| Impacto en el cliente | 15% | 4 | 0.60 | Protege la experiencia del canal digital. |
| Impacto en el negocio | 15% | 4 | 0.60 | Reduce pérdida operativa por fraude de forma medible. |
| Viabilidad y capacidad | 15% | 3 | 0.45 | Complejidad media; requiere ventana de cambio y apoyo de proveedor. |
| **Puntaje total ponderado** | | | **4.20** | **Decisión: banda alta; fuerte candidata a aprobar como proyecto.** |

**Núcleo común de los dos ejemplos:** el requerimiento obtiene (4 + 3 + 5) / 3 = 4.00 y el proyecto (5 + 5 + 4) / 3 = 4.67, con impacto (4 + 4) / 2 = 4. Si compitieran por la misma célula, la Comisión de proyectos daría preferencia al proyecto, salvo que la matriz 9.17 mostrara que ambos caben.

## 7.3 Reglas de decisión

**Alcance de estas reglas:** las bandas aplican igual a los dos modelos. La Mesa de Demanda las usa sobre el backlog de requerimientos con el modelo de 7.1.1, y sobre los pre-proyectos con el de 7.1.2; la Comisión de proyectos las usa sobre los proyectos propuestos y de entrada directa con el modelo de 7.1.2. La instancia y el modelo cambian; la lógica de bandas es la misma.

| **Banda / condición** | **Decisión recomendada** |
|---|---|
| Banda alta (≈ 4.0 o más) | Fuerte candidata a priorizar, si existe capacidad. En la Mesa de Demanda, ejecución o, si es un pre-proyecto, validación y paso a Marco 2. En la Comisión de proyectos, aprobación como proyecto. |
| Banda media (≈ 3.0 a 3.9) | Diferir para refinar alcance, beneficios o dependencias, en la instancia que corresponda (5.3 · 6.3). |
| Banda baja (≈ menos de 3.0) | Diferir o rechazar. Si el problema es de formulación, se difiere para que el área la reformule. |
| Riesgo regulatorio o de ciberseguridad alto | Escalar a la Mesa de Demanda o a la Comisión de proyectos, según el marco, aunque el puntaje sea bajo. La instancia que la gobierna resuelve y ejecuta; la Comisión de proyectos recibe la cartera regulatoria consolidada (ver regla de visibilidad al pie de esta tabla). |
| Sin responsable claro | Sin dueño funcional definido (requerimientos) o sin sponsor identificado (pre-proyecto y proyectos): no validar ni aprobar hasta resolver el accountability. |
| Pronunciamiento desfavorable de la VPEG | No se prioriza, valida ni aprueba, cualquiera sea su puntaje; el ítem vuelve al área solicitante (8.1). |
| Sin capacidad real | Aprobar con inicio programado (ver abajo), después de descartar el desplazamiento de un ítem de menor puntaje (7.5) y la capacidad alternativa (6.8). No se difiere: el diferido es para refinar, no para esperar capacidad. Si la única forma de atenderla fuera pausar o reprogramar proyectos en ejecución, no se resuelve en la Mesa de Demanda: se eleva a la Comisión de proyectos como conflicto de capacidad (5.3 · 7.5). |

**Regla de visibilidad de la demanda regulatoria:** la exposición regulatoria es del banco, no del área que la origina, pero el gobierno sigue siendo proporcional al tamaño de la demanda. Por eso la demanda regulatoria se resuelve en la instancia que le corresponde por su marco (la Mesa de Demanda no eleva a la Comisión de proyectos cada requerimiento de Cumplimiento normativo), y a cambio la Comisión de proyectos recibe en cada sesión la cartera regulatoria consolidada: todos los requerimientos de Cumplimiento normativo y todos los proyectos con origen normativo verificado (4.2), tengan o no fecha límite, vivos en los dos marcos, con su fecha límite normativa si la tienen y su estado. La Comisión de proyectos no decide caso por caso sobre los requerimientos regulatorios; los ve, y puede pedir que un caso concreto se eleve si considera que la exposición lo amerita. La consolida la PMO junto con el reporte agregado que ya produce (8.3). Los Mandatos de franquicias no forman parte de esta cartera: los gestiona, decide y sigue la Mesa de Demanda.

**Aprobación con inicio programado:** resuelve el caso de un ítem que cumple todas las condiciones y obtiene puntaje alto, pero cuya área ejecutora, por lo general Medios Tecnológicos, no tiene capacidad hasta un período posterior. Diferirlo sería un error: el diferido está pensado para refinar, y su tope de reevaluaciones terminaría rechazando o reformulando un ítem que no tiene nada que corregir. Las reglas son siete.

- **Alternativas previas:** antes de aceptar la espera, la instancia revisa en este orden el desplazamiento de un ítem en ejecución de menor puntaje con el núcleo común (7.5) y la capacidad alternativa, es decir proveedor, célula dedicada (6.8) o refuerzo temporal de personal, por proveedor o por contratación directa, si el presupuesto y el caso lo justifican. El costo del refuerzo se registra en las fichas 9.3 y 9.7 y se aprueba junto con el ítem. Solo si ninguna procede, aprueba con inicio programado.

- **Fecha respaldada:** la fecha de inicio sale de la matriz de capacidades (9.17), no de una promesa verbal. Esa capacidad futura queda registrada como comprometida para el ítem; si otro la quiere, aplica la regla de conflicto de 7.5, igual que para los ítems en ejecución.

- **No es un diferido:** el ítem no va al backlog de proyectos ni al de requerimientos, no se reevalúa y no le corre el plazo del diferido (11.3). Queda en estado «Planificación» con su fecha de inicio programada: el proyecto, en la lista de proyectos activos, con su PRY asignado al aprobarse (9.0.1) y el acta 9.5 firmada al iniciar la fase 3; el requerimiento, en el backlog de Marco 1, marcado como aprobado.

- **Tope de espera:** el inicio programado no puede quedar a más de tres meses de la aprobación en Marco 2 ni a más de 30 días en Marco 1. Si la espera fuera mayor, el caso de negocio puede envejecer: la instancia elige entre capacidad alternativa y volver a aprobarlo con datos actualizados.

- **Verificación previa:** un mes antes del inicio en Marco 2, y una semana antes en Marco 1, el PM de demanda confirma la capacidad con la matriz 9.17. Si el área ejecutora no llega a la fecha, el inicio no se corre en silencio: se eleva a la instancia como conflicto de capacidad (7.5).

- **Presupuesto reservado:** en Marco 2, el Área Financiera confirma que el presupuesto aprobado queda reservado para el período de inicio; si cambia de ejercicio fiscal, lo deja dicho en el acta (9.10).

- **Medición:** el tiempo entre la aprobación y el inicio programado se mide como tramo propio, «espera de capacidad», dentro del lead time por tramo (10.1). Así queda visible si el cuello de botella es la capacidad del área ejecutora y no la decisión.

**Prioridad de la obligación con fecha límite externa:** cuando la demanda responde a una obligación con fecha de cumplimiento fijada por el regulador, un organismo de control o una franquicia, el puntaje no decide si se hace, sino que sirve para dimensionar su esfuerzo y ubicarla frente al resto de la carga. Una fecha impuesta por un tercero no es negociable por ninguna instancia del banco: la instancia que gobierna la demanda debe asegurar su cumplimiento y, si la capacidad no alcanza, escalar el conflicto de capacidad, no diferir la obligación. Las bandas de esta tabla no aplican para decidir su ejecución. Si falta el reporte de capacidad de un área, rige la excepción de 7.4.

## 7.4 Capacidad por área y matriz de capacidades

**¿Por qué esta sección?** El criterio de capacidad de los dos modelos («Esfuerzo y capacidad» y «Viabilidad y capacidad», 7.1) y la regla «Sin capacidad real» (7.3) asumen que se sabe, al momento de priorizar, cuánta capacidad tiene disponible cada área involucrada. Sin ese dato, el criterio se califica por percepción y no por evidencia, y el marco cae exactamente en el antipatrón que busca evitar: aprobar más de lo que el banco, con su gente y sus proveedores, puede ejecutar de verdad. Esta sección no crea un nuevo nivel de gobierno ni una instancia adicional: define la matriz de capacidades (9.17), que las áreas actualizan antes de cada sesión, para que el scoring y las decisiones de la Mesa de Demanda y de la Comisión de proyectos se apoyen en un dato vigente y no en una estimación libre.

| **Quién reporta** | **Qué reporta** | **A quién** | **Con qué frecuencia** |
|---|---|---|---|
| Medios Tecnológicos (por célula o equipo, incluida Arquitectura), Gestión de Procesos, Seguridad Bancaria y Riesgos | La matriz de capacidades (9.17): capacidad total, comprometida por ítem y disponible del período, ventanas de cambio y perfiles críticos. | PMO, para consolidar antes de cada sesión de priorización | Antes de cada Mesa de Demanda y cada Comisión de proyectos (5.3 · 6.3) |
| Administración | Disponibilidad y tiempos de respuesta conocidos de los proveedores críticos con contrato vigente. | PMO | Mensual, o cuando un ítem en agenda requiera proveedor |
| Área Financiera | Presupuesto disponible del período frente al comprometido. | PMO | Mensual, alineado al ciclo de aprobación de inversiones (8.2) |
| Legal | Tiempos de respuesta vigentes para revisar contratos, acuerdos de confidencialidad (NDA) y adendas. | PMO | Solo cuando un ítem en agenda activa su disparador (6.7) |

**Quién no reporta:** Cumplimiento y Talento Humano no reportan capacidad, porque acompañan con voz consultiva y no ejecutan (6.7). Si su intervención puede demorar un ítem, se registra como riesgo en la ficha 9.3 o en la matriz 9.6, no como capacidad.

**Saturación estructural:** el marco no contrata personal, pero sí debe mostrar cuándo hace falta. Si un perfil aparece como saturado en la matriz 9.17 durante tres meses consecutivos, la PMO lleva el caso a la Comisión de proyectos con la evidencia: la matriz, el indicador de utilización de capacidad (10.1) y los ítems frenados o en espera de capacidad, incluidos los aprobados con inicio programado (7.3). La Comisión de proyectos no contrata: recomienda al dueño del área, por ejemplo el CIO en Medios Tecnológicos, que evalúe contratar, tercerizar o redistribuir, y deja la recomendación en el acta (9.10). El dueño del área responde en la sesión siguiente. La contratación, si se decide, sigue la vía de presupuesto y de Talento Humano del banco, fuera de este marco.

**Uso en la priorización:** la PMO consolida estos reportes y los presenta como insumo de la sesión, junto al scoring (7.1), para que la calificación del criterio de capacidad y la aplicación de la regla «Sin capacidad real» (7.3) se basen en la capacidad reportada del período, no en una impresión general. El instrumento es la matriz de capacidades por área (9.17). Cada área puede llevarla en su propia herramienta, siempre que entregue los campos de 9.17: el marco exige el contenido, no el formato, con el mismo criterio que 9.4.

**Sin matriz vigente no se prioriza.** Al preparar cada sesión de la Mesa de Demanda y de la Comisión de proyectos, la PMO verifica que la matriz del período esté actualizada con el reporte de las cuatro áreas que la llevan: Medios Tecnológicos, Gestión de Procesos, Seguridad Bancaria y Riesgos. Los reportes de Administración, del Área Financiera y de Legal informan la decisión, pero su falta no impide priorizar: la instancia decide con el último dato disponible y lo deja en acta (9.10). Si falta el reporte de cualquiera de las cuatro áreas, la sesión no prioriza, no valida ni aprueba ítems: puede tratar el resto de su agenda (seguimiento, cierres, cambios en curso), pero las decisiones de priorización pasan a la siguiente sesión con la matriz completa. Esta postergación ocurre una sola vez: en la sesión siguiente se decide con la capacidad efectivamente reportada y la falta queda registrada en el acta (9.10 · 11.3). Así, el criterio de capacidad (7.1) y la regla «Sin capacidad real» (7.3) se aplican siempre sobre un dato reportado, nunca sobre una impresión.

**Excepción:** la demanda que responde a una obligación con fecha límite fijada por el regulador, un organismo de control o una franquicia (7.3) sí se prioriza aunque falte el reporte de un área. La instancia decide con la capacidad efectivamente reportada; si no alcanza, escala el conflicto de capacidad sin diferir la obligación (7.3). La falta del reporte queda registrada en el acta (9.10).

## 7.5 Conflictos de capacidad entre ítems con capacidad comprometida

**Qué cubre esta sección.** Cualquier ítem con capacidad ya comprometida, sea un requerimiento (BAU) de Marco 1, de cualquier categoría, o un proyecto de Marco 2, puede tener que suspenderse para cederle su capacidad a otro, cuando la razón de negocio lo justifica. También entra la capacidad futura reservada a un ítem aprobado con inicio programado (7.3): ese ítem no se suspende, porque aún no empezó, sino que se reprograma su inicio con la misma regla de decisión, y la nueva fecha queda en el acta (9.10) y en la matriz 9.17. El pre-proyecto queda fuera de este universo: nunca está en ejecución, es una etapa de análisis previa a la aprobación (5.5), así que no tiene capacidad comprometida que pueda suspenderse. Sí puede ser, una vez aprobado como Proyecto, el que dispare la necesidad de capacidad que lleva a suspender otro ítem.

**Sobre el valor «Suspendido» en la ficha de pre-proyecto (9.3).** El campo Estado de 9.3 comparte la misma taxonomía que 9.1 y 9.4, y por eso incluye «Suspendido» entre sus opciones. Ese valor no se origina nunca en un conflicto de capacidad de esta sección, porque el pre-proyecto no tiene capacidad comprometida que ceder. Si se usa, es por una razón ajena a 7.5, como una pausa del análisis a la espera de información. No debe confundirse con la suspensión que aquí se define.

**Regla de decisión: por prioridad, no por jerarquía del rubro.** Cuando servir un ítem exige suspender otro que ya estaba priorizado y en curso, la comparación se hace por puntaje: entre dos requerimientos, con el modelo de requerimientos (7.1.1); entre dos proyectos, con el de proyectos (7.1.2); entre un requerimiento y un proyecto, con el núcleo común (7.1.3). Un requerimiento bien puntuado puede pesar más que un proyecto mal puntuado. El grupo no decide por sí solo; solo determina quién tiene autoridad para decidir y ejecutar, según la tabla siguiente. El conflicto se identifica y se dimensiona con la matriz de capacidades (9.17).

| **Ítem que se suspende** | **Quién decide** | **Quién ejecuta y registra** | **Instrumento** |
|---|---|---|---|
| Requerimiento (BAU) que compite con otro requerimiento | Mesa de Demanda, directamente (modelo de requerimientos) | Mesa de Demanda | 9.1 o 9.4, según el ítem |
| Requerimiento (BAU) que compite con un proyecto | Comisión de proyectos (conflicto entre marcos, núcleo común) | Mesa de Demanda ejecuta la suspensión sobre su propio backlog | 9.1 o 9.4 |
| Proyecto que compite con otro proyecto o con un requerimiento | Comisión de proyectos, siempre | Comisión de proyectos / PMO | 9.9 |

**Qué significa suspender aquí.** Un ítem suspendido ya empezó y se interrumpe a mitad de camino; no es lo mismo que diferir un ítem que aún no arrancó (5.3 · 6.3), que sigue su propio mecanismo de reevaluación periódica (9.14). El tratamiento de su fecha y de su semáforo mientras dura la suspensión, y al reanudarse, es el que ya define 10.2 (casos borde: Suspendido).

**Salvaguardas.** Las mismas que ya rigen el conflicto de capacidad en 5.3, extendidas a los dos marcos: un ítem con obligación externa con fecha no se suspende para cederle capacidad a otro que no la tiene (7.3); no se le pide al área que solicita el nuevo ítem que nomine qué suspender; no se decide por antigüedad ni por negociación entre áreas; quien responde por el ítem afectado (dueño funcional o sponsor) participa en la sesión que decide, y la decisión queda en el acta (9.10) de la instancia que corresponda.

