# 12. Anexos operativos

## 12.1 Checklist de calidad antes de aprobar un proyecto

- Existe un sponsor con autoridad real sobre el presupuesto y los beneficios.

- El proyecto llega por una vía válida: proyecto propuesto validado por la Mesa de Demanda, o entrada directa con su condición registrada (6.2 · 9.1).

- El problema está definido con evidencia, no solo con percepción.

- Se evaluaron alternativas (incluida la de no hacer nada) y se justifica la opción elegida.

- El alcance y, sobre todo, las exclusiones son claros.

- Hay estimación de costo, tiempo, equipo y dependencias (basta nivel ROM al inicio).

- Se identificaron los riesgos de negocio, tecnología, seguridad, datos y continuidad en la ficha 9.3; la matriz 9.6 se abre en la planificación.

- La Comisión de proyectos conoce las observaciones especializadas registradas en el análisis de Marco 1 (5.3), si las hubo; la revisión técnica temprana (12.3) se completa en la fase 3.

- El sponsor está identificado, disponible para exponer y su presentación cubre el contenido mínimo (6.11).

- Los beneficios tienen dueño, línea base, meta y fecha de medición (9.3 y 9.7; se verifican en 9.11).

- La matriz de capacidades (9.17) muestra capacidad para ejecutarlo, o se aplica la excepción de la obligación con fecha límite externa (7.4).

- La categoría de proyecto está asignada (9.0.3) y, si es Proyecto Estratégico, la alta dirección participa en la aprobación (6.5.1).

- Planificación Estratégica validó la alineación al objetivo estratégico y la calificación del primer criterio del modelo de proyectos (7.1.2 · 8.1).

- Si la VPEG se pronunció, su resultado y sus condiciones están registrados (9.2); con pronunciamiento desfavorable, el proyecto no se trata (8.1).

- Se identificó qué necesita la operación para soportar la solución; se detalla en la planificación y se ejecuta con el plan de transición (9.8).

- Si hubo proveedor, el acuerdo de confidencialidad se firmó antes de solicitar cotizaciones y está registrado en la ficha de proveedor (6.8.2 · 9.12).

- Si introduce o modifica un tratamiento de datos personales, está declarado (9.1, parte C) y la evaluación 9.13 queda prevista para la planificación; el proyecto no pasa a ejecución con observaciones pendientes del oficial de protección de datos. Si reutiliza un tratamiento ya evaluado, se referencia la evaluación vigente.

## 12.2 Antipatrones que el marco debe evitar

| **Antipatrón** | **Daño que causa** | **Corrección** |
|---|---|---|
| **Todo es proyecto** | Satura instancias y oculta los requerimientos del día a día. | Aplicar el árbol de decisión (4.4) y el gobierno proporcional. |
| **Clasificar por el tema y no por la complejidad** | Un ajuste pequeño termina como proyecto porque «es estratégico», o un proyecto se esconde como Evolutivo. | El grupo lo decide el árbol (4.4); la categoría, las definiciones y la precedencia de 4.3. |
| **Todo es urgente** | Destruye la planificación y la calidad. | Exigir justificación de la urgencia con fecha regulatoria o de negocio. |
| **Todo es normativo** | Etiquetar como normativo lo que no lo es para saltarse la priorización, o colgarle alcance a una fecha regulatoria. | Verificación del origen por Cumplimiento y alcance normativo mínimo (4.2). |
| **Aprobar sin capacidad** | Genera retrasos y frustración en cadena. | Priorizar contra la capacidad real que reporta cada área en la matriz 9.17 (7.4), incluidas células y proveedores. |
| **Caso de negocio decorativo** | Se aprueban inversiones sin valor medible. | Medir los beneficios post-implementación (9.11). |
| **Papeleo como fin en sí mismo** | El marco inmoviliza en lugar de ordenar. | Regla de datos mínimos (4.4): si un campo no sirve para decidir, no se llena. |
| **Técnica al final** | Retrabajo y deuda técnica descubiertos tarde. | Observación especializada en el análisis (5.3) y revisión técnica temprana antes de construir (12.3). |
| **Que el área solicitante nomine qué pausar** | Convierte una decisión de cartera en negociación entre áreas y deja al área solicitante decidiendo sobre recursos y beneficios ajenos. | Elevar el conflicto de capacidad a la Comisión de proyectos y comparar por el núcleo común (7.1.3 · 7.5). |
| **Instancias sin decisiones** | La instancia se reúne pero la cartera no cambia. | Actas de sesión con decisiones explícitas (9.10). |
| **La POC que nunca termina o que pasa a producción** | Consume capacidad sin decisión y lleva a producción algo que no pasó por el gobierno. | Criterio de éxito previo, plazo de referencia con una sola prórroga y pase a producción solo como demanda nueva (5.6). |

## 12.3 Política de revisión técnica temprana (consultiva)

La revisión es temprana porque se hace antes de construir, no al final. En Marco 2 ocurre en la fase de inicio y planificación (6.3), una vez que la Comisión de proyectos aprobó el proyecto y después del Discovery (6.3.1), cuyo resultado toma como insumo. Al aprobar, la Comisión de proyectos ya conoce los riesgos de la ficha 9.3 y, en el proyecto propuesto, las observaciones especializadas registradas en el análisis de Marco 1 (5.3). Si la revisión detecta un impacto que cambia alcance, costo o plazo, se tramita como cambio (6.6). Su resultado es una opinión técnica documentada, no un veto. Seguridad Bancaria, Gestión de Procesos, Cumplimiento y Arquitectura participan, opinan y quedan registrados; Riesgos acompaña cuando hay implicaciones de riesgo operativo, de negocio o regulatorio (8.2).

| **Frente de revisión** | **Qué se valida** |
|---|---|
| **Arquitectura** | Impacto en aplicaciones e integraciones, reutilización de plataformas, deuda técnica. |
| **Seguridad y datos** | Datos sensibles y clasificación, accesos e identidades, privacidad (9.13). |
| **Continuidad y operación** | RTO/RPO esperados, monitoreo, respaldo, soporte post-producción. |
| **Cumplimiento** | Regulación aplicable (incluida la LOPDP), retención documental. |

## 12.4 Custodia y control de cambios de este marco

**Por qué esta sección.** Este documento exige trazabilidad a toda la demanda y a todo cambio de proyecto; sería incoherente que su propia evolución no la tuviera. Esta sección define quién puede proponer un cambio al marco, quién lo autoriza, cómo se registra y desde cuándo rige. No crea una comisión nueva: usa el gobierno que ya existe.

| **Aspecto** | **Regla** |
|---|---|
| **Custodia** | La PMO custodia el marco y los modelos de priorización (8.3). Mantiene la versión vigente, el histórico y el registro de cambios. |
| **Quién puede proponer** | Cualquier rol de la sección 8.2, las tres instancias de gobierno (8.1) y las áreas que acompañan (Seguridad Bancaria, Gestión de Procesos, Cumplimiento, Arquitectura, Riesgos, Legal y Talento Humano). La propuesta se dirige a la PMO con el problema que busca resolver, no solo con la redacción sugerida. |
| **Cambio menor** | Corrección de erratas, referencias cruzadas, numeración, ejemplos o precisiones de redacción que no alteran una regla. Lo aplica la PMO y lo informa en la siguiente sesión de la Comisión de proyectos. |
| **Cambio mayor** | Modifica una regla de gobierno, un umbral, un rol, una instancia, un instrumento o un indicador. Requiere aprobación de la Comisión de proyectos (8.1) y queda registrado en el acta (9.10). |
| **Vigencia** | Un cambio mayor rige desde la fecha que fije la Comisión de proyectos al aprobarlo. La demanda y los proyectos en curso terminan bajo la versión con la que iniciaron, salvo que la Comisión de proyectos disponga lo contrario de forma expresa. |
| **Registro** | Cada versión lleva número, fecha y un resumen de qué cambió y por qué. El histórico lo conserva la PMO y está disponible para auditoría interna. |
| **Revisión periódica** | La PMO revisa el marco al menos una vez al año, o antes si los indicadores de la sección 10 muestran que una regla no está funcionando. La revisión se apoya en datos reales, no en percepción. |

**Criterio de fondo:** el marco se corrige cuando la evidencia lo contradice. Una regla que en la práctica se incumple sistemáticamente no es un problema de disciplina de los equipos: es una señal de que la regla está mal calibrada y debe revisarse. Ese es el mismo principio que el roadmap aplica en sus días 51–60 al ajustar umbrales y plazos con los primeros datos reales.

## 12.5 Diagramas de proceso (BPMN)

Los diagramas oficiales de Marco 0, Marco 1 y Marco 2 están modelados en notación BPMN 2.0.2 en Bizagi y los mantiene Gestión de Procesos. Las figuras del cuerpo son versiones simplificadas con el estilo del marco. Si un diagrama y el texto aprobado difieren, rige el texto, y la diferencia se corrige con el procedimiento de 12.4. Los diagramas completos se incorporan a este anexo, en páginas horizontales, cuando Gestión de Procesos publique su versión actualizada.

| **Diagrama** | **Figura simplificada** | **Estado para el anexo** |
|---|---|---|
| **Marco 0 · Gestión común de triage** | Figura 3 (4.4) | Se incorpora con la versión que publique Gestión de Procesos. |
| **Marco 1 · Gestión de requerimientos (BAU)** | Figura 5 (5.3) | Se incorpora con la versión que publique Gestión de Procesos; incluirá los subprocesos de la fase 4 con las etapas de ejecución de 5.7. |
| **Marco 2 · Gestión de proyectos** | Figura 6 (6.3) | Requiere actualizar en Bizagi la lógica descrita en 6.3 antes de incorporarse. |

