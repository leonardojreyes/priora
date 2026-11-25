# 1. Resumen ejecutivo

El problema de fondo rara vez es el volumen de solicitudes. En un banco, un ajuste en un canal, una mejora funcional, una exigencia regulatoria y un proyecto estratégico tienen muy poco en común en cuanto a riesgo, costo y urgencia; sin embargo, cuando entran todas por el mismo lugar y se discuten con el mismo nivel de detalle, el resultado suele ser parecido: trabajo duplicado, equipos de tecnología saturados y decisiones de inversión tomadas más por insistencia que por análisis.

Este marco define dos metodologías integradas que comparten una única entrada de demanda y un tramo común de triage (Marco 0, 4.4):

- **Marco 1 (Gestión de requerimientos, BAU):** prioriza y controla los requerimientos del día a día en seis categorías (Cumplimiento normativo, Evolutivo, Solicitud de información, Mandatos de franquicias, POC / Estimaciones y Requerimientos IT4IT) y valida los pre-proyectos antes de elevarlos a Marco 2 (5.5). Lo gobierna la Mesa de Demanda.

- **Marco 2 (Gestión de proyectos tecnológicos):** gobierna los proyectos en sus tres categorías (Proyectos IT4IT, Proyecto Estratégico y Proyecto Operativo), sean propuestos por la Mesa de Demanda o de entrada directa (6.2), con sponsor, presupuesto, cronograma, riesgos, arquitectura, seguridad y beneficios medibles.

El gobierno descansa en tres instancias (Mesa de triage, Mesa de Demanda y Comisión de proyectos) y en la revisión opcional y vinculante de la VPEG (8.1). Ninguna prioriza sin la matriz de capacidades de las áreas (9.17).

Nota: los incidentes tecnológicos (caídas de servicio, degradaciones de canal) no son parte de este marco; se gestionan por el área de Medios Tecnológicos según el marco normativo interno del banco.

La clave de diseño sigue siendo una entrada única de demanda con clasificación temprana en dos niveles: el grupo (requerimiento o proyecto), que decide un árbol de decisión según la complejidad, y la categoría, que indica su naturaleza y sus reglas (sección 4). Cada grupo tiene su instancia, su modelo de priorización (7.1) y su matriz RACI (8.4).

## 1.1 Resultado esperado

| **Resultado** | **Efecto práctico esperado** |
|---|---|
| Priorización comparable | Toda demanda se evalúa con criterios homogéneos: un modelo corto para requerimientos y uno completo para proyectos, con la misma escala y un núcleo común (7.1), contrastados con la capacidad que reporta cada área (9.17). |
| Reducción de desorden | Los requerimientos del día a día van al backlog de la Mesa de Demanda; las inversiones se gestionan como proyectos en la Comisión de proyectos. |
| Gobierno proporcional | A mayor impacto, presupuesto, riesgo o complejidad, mayor nivel de aprobación y control. |
| Trazabilidad | Cada decisión de aprobar, diferir, rechazar, reclasificar o validar un pre-proyecto queda documentada en el acta (9.10). |
| Medición de valor | No basta con poner en producción; se mide adopción, beneficios, estabilidad y cierre de riesgos. |

## 1.2 Decisiones de diseño

| **Elemento** | **Decisión** | **Resultado esperado** |
|---|---|---|
| Gobierno de proyectos | Cada proyecto se gobierna individualmente en la Comisión de proyectos. | Decisiones ágiles con trazabilidad completa. |
| Pre-proyecto | Se gestiona en Marco 1: la Mesa de Demanda lo valida y lo eleva a Marco 2 como proyecto propuesto; la inversión la aprueba la Comisión de proyectos. | Se separa la validación de la necesidad de la decisión de inversión. |
| Revisión de la VPEG | Opcional y vinculante, antes de que decidan la Mesa de Demanda o la Comisión de proyectos; no preside ninguna instancia (8.1). | La alta dirección puede intervenir sin crear una instancia más. |
| Capacidad por área | Matriz obligatoria de Medios Tecnológicos, Gestión de Procesos, Seguridad Bancaria y Riesgos (9.17); sin ella no se prioriza, salvo obligación externa con fecha límite (7.4). | Se prioriza contra la capacidad real, no contra la supuesta. |
| Alineación estratégica | Conexión directa: directriz estratégica → objetivo estratégico → demanda. Cada demanda relevante nombra el objetivo al que contribuye. | Trazabilidad estratégica sin capas intermedias. |
| Flujo de demanda | Marco 0: un flujo común de triage con Paso 0 (origen en el negocio o en la operación de Medios Tecnológicos) explícito, que enruta a Marco 1 o Marco 2. | Claridad sobre quién origina la necesidad y una sola puerta de clasificación. |
| Clasificación | Dos niveles: grupo (Requerimientos BAU o Proyectos), decidido con un árbol de decisión, y categoría (seis de requerimiento y tres de proyecto). | Cada demanda llega a la instancia que le corresponde por su complejidad, no por su tema. |
| Priorización | Dos modelos con escalas 1/3/5 explícitas: cuatro criterios para requerimientos y seis para proyectos, con un núcleo común para comparar entre marcos (7.1). | Priorización comparable y auditable, proporcional al nivel de gobierno. |
| RACI | Una matriz por instancia de priorización: requerimientos y proyectos (8.4). | Responsabilidades claras en cada marco, con una sola A por actividad. |
| Plantillas | Diecinueve instrumentos calibrados al ciclo completo. | Solo los campos que sirven para clasificar, priorizar o decidir. |
| Área Financiera | Incorporada al ciclo de proyecto en fases 1, 2 y 6, y en el RACI. | Análisis económico y financiero desde la estimación hasta la verificación de beneficios. |

## 1.3 Cómo leer este documento

Las secciones 2 a 4 fijan principios, fuentes, la taxonomía de demanda y el flujo común de triage (Marco 0, en 4.4). Las secciones 5 y 6 describen los dos marcos que nacen de esa clasificación. La sección 7 contiene el modelo de priorización. La sección 8 define el gobierno. **La sección 9 reúne las plantillas; es la parte que el banco usará a diario.** Las secciones 10 a 14 cubren indicadores, implantación, anexos (con los diagramas BPMN en 12.5), glosario y bibliografía.

