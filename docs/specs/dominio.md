# Spec: modelo de dominio de Priora

> Fuente funcional: `docs/referencia/`. Este documento traduce el marco a un modelo **genérico y parametrizable**. Si un concepto tiene nombre propio de una empresa (por ejemplo, "Mesa de Demanda"), aquí aparece con su nombre genérico y el nombre real vive en la plantilla.

## 1. Propósito del producto

Priora gestiona la **demanda de tecnología** de una organización desde que un área expresa una necesidad hasta que se cierra y se miden sus beneficios: una sola puerta de entrada, clasificación con reglas, priorización con modelos ponderados contra la capacidad real, decisiones colegiadas con acta, ejecución trazable y medición. Las áreas, instancias, pasos, formularios, plazos y pesos cambian entre empresas; el sistema los toma de la configuración.

Fuera de alcance: gestión de incidentes, mesa de servicio ITSM, gestión detallada de tareas de desarrollo (sprints, tickets técnicos). Priora se integra con esas herramientas por API, no las reemplaza.

## 2. Lenguaje ubicuo (genérico → ejemplo en la plantilla bancaria)

| Término genérico (código) | Qué es | Ejemplo en `marco-tic-banca` |
| --- | --- | --- |
| Empresa (`tenant`) | Organización cliente aislada | Un banco |
| Área (`area`) | Unidad organizativa, jerárquica (área > departamento > sección) | Medios Tecnológicos, Gestión de Procesos |
| Rol funcional (`functionalRole`) | Papel en el proceso, distinto del permiso técnico | PM de demanda, Dueño funcional, Sponsor |
| Instancia de gobierno (`governanceBody`) | Órgano que decide en sesión, o revisor ejecutivo | Mesa de triage, Mesa de Demanda, Comisión de proyectos, Revisión VPEG |
| Demanda (`demand`) | El ítem que recorre todo el ciclo; nunca se duplica | DEM-2026-0142 |
| Grupo (`demandGroup`) | Primer nivel de clasificación; decide marco e instancia | Requerimientos (BAU), Proyectos |
| Categoría (`demandCategory`) | Segundo nivel; activa reglas particulares | Evolutivo, Proyecto Estratégico |
| Etapa de demanda (`demandStage`) | Condición de madurez que no es categoría | Pre-proyecto, Proyecto propuesto |
| Marca (`flag`) | Atributo con efecto en reglas | Obligación externa con fecha, Riesgo regulatorio alto |
| Flujo (`processDefinition`) | Proceso versionado que ejecuta el motor | Marco 0, Marco 1, Marco 2 |
| Instrumento (`instrumentDefinition`) | Formulario versionado con reglas | Ficha 9.1, Hoja 9.2 |
| Modelo de priorización (`scoringModel`) | Criterios, pesos, anclas y bandas | Modelo de requerimientos, Modelo de proyectos |
| Árbol de clasificación (`classificationTree`) | Preguntas determinantes + factores con umbral | Árbol requerimiento o proyecto |
| Sesión (`session`) | Reunión de una instancia con agenda, quórum, decisiones y acta | Sesión semanal de la Mesa de Demanda |
| Reporte de capacidad (`capacityReport`) | Capacidad total, comprometida y disponible de un equipo en un período | Matriz 9.17 |
| Expediente (`dossier`) | Conjunto de documentos y registros de una demanda | Expediente 9.0.4 |

## 3. Entidades principales

Todas las tablas llevan `tenant_id` y están protegidas por RLS (ver `seguridad-y-multiempresa.md`). Todas las entidades configurables llevan `version` y `vigente_desde`.

### 3.1 Configuración (por empresa)

- **Empresa**: nombre, marca (logo, colores), zona horaria, idioma, calendario laboral (días hábiles y feriados), formatos de identificador, módulos activos.
- **Área**: nombre, código, padre, tipos (`solicitante`, `ejecutora`, `consultiva`, `reporta_capacidad`, `obligatoria_en_capacidad`), responsable.
- **Usuario**: identidad desde Keycloak (sub), nombre, correo, áreas a las que pertenece.
- **RolFuncional** y **AsignaciónRol**: usuario ↔ rol, con alcance opcional (todas las áreas, un área, una demanda). Una demanda también asigna roles por registro (dueño funcional, sponsor, responsable asignado).
- **InstanciaGobierno**: tipo (`colegiada` | `revision_ejecutiva` | `operativa`), frecuencia sugerida, miembros (rol o usuario, con `voto` o `consultivo`), regla de quórum (expresión sobre asistentes), decisiones permitidas (catálogo), si exige matriz de capacidad completa, si su pronunciamiento es vinculante.
- **Taxonomía**: grupos, categorías por grupo (con reglas, ver 4), etapas, estados, tramos de seguimiento, catálogos (urgencia, impacto, beneficio, origen normativo…).
- **PlanEstratégico**: directrices → objetivos estratégicos (vigencia), OKR por área.
- **Definiciones versionadas**: flujos, instrumentos, árbol de clasificación, modelos de priorización, tabla de plazos, plantillas de notificación.

### 3.2 Operación

- **Demanda**: identificador principal (DEM) y lista de **Identificadores** adicionales (`tipo`, `valor`, `vigente`, `asignado_en`), p. ej. PPY y PRY que heredan la cadena. Campos núcleo tipados: título, área y unidad solicitante, dueño funcional, delegado, grupo, categoría, etapa, estado, urgencia declarada y validada, objetivo estratégico, fechas (registro, clasificación, decisión, inicio programado, inicio, línea base, vigente, cierre), seguimiento vigente (tramo, responsable, fecha del último traspaso), marcas, vínculos (duplicado de, derivada de, depende de). El resto de datos vive en los **registros de instrumento**.
- **RegistroInstrumento**: demanda + definición y versión del instrumento + `datos` (JSONB validado contra la definición) + estado (`borrador`, `emitido`, `anulado`) + autor y fechas + firmas o conformidades. Un instrumento puede tener varias versiones emitidas; se conserva el historial.
- **InstanciaProceso**, **Token**, **TareaHumana**, **Temporizador**: ejecución del motor (ver `motor-flujos.md`).
- **Evaluación**: demanda + modelo y versión + calificaciones por criterio con justificación (obligatoria para 2 y 4) + total + núcleo común + banderas + capacidad evaluada.
- **Sesión**: instancia, fecha, estado (`planificada`, `en_curso`, `cerrada`), agenda (ítems con motivo: priorizar, validar, seguimiento, cambio, conflicto, reevaluación), asistentes, quórum verificado, foto de capacidad usada, **Decisiones**, acta emitida.
- **Decisión**: ítem, tipo (catálogo de la instancia), justificación, condiciones, fecha programada si aplica, efectos ejecutados por el motor.
- **Pronunciamiento**: revisor ejecutivo, ítem, resultado (`favorable`, `favorable_con_condiciones`, `desfavorable`), justificación, fecha. Ausencia de pronunciamiento antes de la sesión = el proceso sigue.
- **Diferimiento** y **Reevaluación**: cadencia, máximo, resultado de cada reevaluación, decisión final obligatoria.
- **ReporteCapacidad**: área/equipo, período, horizonte, total, compromisos por ítem, restricciones, ventanas, perfiles saturados, compromisos futuros.
- **SolicitudCambio**: identificador propio (CHG-DEM / CHG-PRY), magnitud calculada o declarada, aprobador según umbral, resultado, impacto en fechas.
- **Documento** (expediente): archivo, tipo de instrumento o evidencia, versión, clasificación de acceso, nombre normalizado `{ID}_{instrumento}_v{n}_{fecha}`.
- **EventoBitácora**: todo cambio de estado, decisión, traspaso o edición, inmutable (append-only). Es la fuente de indicadores y de auditoría.
- **Notificación**: destinatario, plantilla, canal (correo, en la aplicación), estado de envío.

## 4. Reglas de categoría (atributos configurables)

Cada categoría declara flags que el motor y los formularios consultan; el código nunca pregunta por el nombre de la categoría:

| Flag | Efecto | Categorías bancarias que lo usan |
| --- | --- | --- |
| `requiere_verificacion_origen` | Abre la verificación del origen normativo | Cumplimiento normativo |
| `fecha_externa_no_negociable` | Puntaje no decide ejecución; no se difiere ni rechaza por puntaje | Cumplimiento normativo, Mandatos de franquicias (si hay fecha) |
| `entra_cartera_regulatoria` | Aparece en la cartera regulatoria consolidada | Cumplimiento normativo |
| `sin_pase_produccion` | Omite certificación e implementación; cierre con informe | Solicitud de información, POC / Estimaciones |
| `plazo_maximo_dias` | Plazo declarado obligatorio | POC (30 hábiles ≈ 6 semanas), Estimación (10) |
| `area_solicitante_restringida` | Solo ciertas áreas pueden ser solicitantes | IT4IT → área de tecnología |
| `relacion_historia` | `1:1` o `1:N` | Solicitud de información y POC: 1:1 |
| `discovery` | `obligatorio`, `opcional`, `no_aplica` | Proyecto Estratégico/Operativo: obligatorio |

## 5. Invariantes (deben tener prueba automatizada)

1. Toda demanda nace por el canal único con los datos mínimos que define la empresa; no existe otra forma de crear una demanda (salvo importación administrativa auditada).
2. Ninguna demanda entra a un flujo de gobierno (marco 1 o 2) sin pasar por el flujo de entrada (marco 0).
3. Una demanda conserva su DEM toda la vida; los identificadores siguientes (PPY, PRY) se agregan, nunca reemplazan, y quedan en la bitácora.
4. Toda demanda tiene en todo momento un responsable de seguimiento con nombre; un traspaso sin sucesor es inválido.
5. Toda demanda declara objetivo estratégico; sin él, el criterio de alineación no puede calificarse por encima de 1.
6. Calificaciones fuera de las anclas (2 y 4) exigen justificación.
7. Una instancia que exige capacidad completa no registra decisiones de priorización si falta el reporte de un área obligatoria, salvo ítems con `fecha_externa_no_negociable`.
8. Un pronunciamiento ejecutivo desfavorable impide que el ítem entre a la sesión; vuelve al área solicitante.
9. Un diferido tiene cadencia y máximo; al agotarse, la única salida válida es una decisión distinta de "diferir".
10. Un ítem suspendido detiene su reloj de plazo; uno diferido no tiene semáforo; un cancelado sale del semáforo.
11. Toda decisión de una instancia se registra en una sesión con quórum verificado y produce acta.
12. Un registro de instrumento emitido no se edita: se emite una versión nueva.
13. Ningún dato de una empresa es visible desde otra (RLS + prueba de aislamiento por módulo).

## 6. Estados y tramos

- **Estado** (ciclo de vida, configurable; plantilla bancaria: Planificación, En ejecución, En pruebas, Suspendido, Finalizado, Cancelado). Lo cambia el motor por acciones del flujo, no el usuario a mano.
- **Tramo de seguimiento** (dónde está para el negocio: triage, análisis, priorización, diferido, ejecución, cierre). Alimenta el lead time por tramo.
- **Nodo actual** del flujo: detalle técnico que la interfaz traduce a tramo y estado.
- **Semáforo de plazo**: calculado, nunca almacenado como estado (ver `plazos-semaforo-indicadores.md`).
