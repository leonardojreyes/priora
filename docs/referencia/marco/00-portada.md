<img src="../img/media/image1.png" style="width:4.30208in;height:0.82292in" />

**MARCO METODOLÓGICO**

**Gestión de requerimientos (BAU) · Gestión de proyectos tecnológicos**

*Una sola puerta de entrada y rutas diferenciadas para la demanda tecnológica, con el mínimo de papeles que el orden exige*

Vicepresidencia de Transformación Estratégica · Planificación Estratégica · Gestión de Procesos

**Versión 2.0 · Octubre 2026 · Documento de trabajo**

| | |
|---|---|
| **Propósito** | Ordenar la demanda tecnológica del banco, separar los requerimientos del día a día (BAU) de los proyectos, priorizar con criterios trazables y asegurar ejecución controlada hasta la entrega y la medición de valor. |
| **Alcance** | Desde la recepción de una necesidad del área solicitante hasta su clasificación, priorización, ejecución, transición a producción y medición de beneficios. |
| **Base de mejores prácticas** | ITIL 4 (operación y cambios), COBIT 2019 (gobierno de I&T), CMMI V3.0 (madurez de procesos y requisitos), TOGAF Standard 10.ª Edición (arquitectura y trazabilidad), PMBOK® Guide 8.ª Edición / The Standard for Project Management de PMI (dirección de proyectos) e IT4IT Standard de The Open Group (cadena de valor de la función de tecnología). Los diagramas de proceso usan la notación BPMN 2.0.2 (OMG). |
| **Decisiones de diseño** | Clasificación en dos niveles (grupo y categoría) con un árbol de decisión; un flujo común de triage (Marco 0) que enruta a las cinco fases de Marco 1 (requerimientos BAU y pre-proyectos) o al ciclo de proyecto (Marco 2); tres instancias de gobierno con la revisión opcional y vinculante de la VPEG; priorización contra una matriz de capacidades por área, con un modelo para requerimientos y otro para proyectos; una matriz RACI por instancia; diecinueve plantillas calibradas al volumen de trabajo bancario. |
| **Alcance y límites** | Este marco adapta buenas prácticas a un contexto bancario: no reemplaza políticas internas, regulación local, apetito de riesgo ni procedimientos de seguridad de la información de la institución. Los incidentes tecnológicos (caídas de servicio, errores en canal) se gestionan por el área de Medios Tecnológicos según el marco normativo interno del banco y no forman parte de este marco metodológico. La gestión del cambio organizacional, como disciplina, tampoco forma parte de esta versión del marco. |

**Contenido**

[1. Resumen ejecutivo [6](#resumen-ejecutivo)](#resumen-ejecutivo)

[1.1 Resultado esperado [6](#resultado-esperado)](#resultado-esperado)

[1.2 Decisiones de diseño [7](#decisiones-de-diseño)](#decisiones-de-diseño)

[1.3 Cómo leer este documento [8](#cómo-leer-este-documento)](#cómo-leer-este-documento)

[2. Principios rectores [8](#principios-rectores)](#principios-rectores)

[2.1 Niveles de planificación: directrices estratégicas, objetivos estratégicos y capa operativa [9](#niveles-de-planificación-directrices-estratégicas-objetivos-estratégicos-y-capa-operativa)](#niveles-de-planificación-directrices-estratégicas-objetivos-estratégicos-y-capa-operativa)

[3. Fuentes de mejores prácticas [11](#fuentes-de-mejores-prácticas)](#fuentes-de-mejores-prácticas)

[4. Taxonomía de demanda TIC y gestión común de triage [12](#taxonomía-de-demanda-tic-y-gestión-común-de-triage)](#taxonomía-de-demanda-tic-y-gestión-común-de-triage)

[4.1 Qué es un pre-proyecto y cómo evoluciona a proyecto [15](#qué-es-un-pre-proyecto-y-cómo-evoluciona-a-proyecto)](#qué-es-un-pre-proyecto-y-cómo-evoluciona-a-proyecto)

[4.2 Grupo, categoría, etapa, origen normativo y marca: cinco datos distintos [16](#grupo-categoría-etapa-origen-normativo-y-marca-cinco-datos-distintos)](#grupo-categoría-etapa-origen-normativo-y-marca-cinco-datos-distintos)

[4.3 Cómo distinguir categorías vecinas [17](#cómo-distinguir-categorías-vecinas)](#cómo-distinguir-categorías-vecinas)

[4.4 Marco 0: gestión común de triage [19](#marco-0-gestión-común-de-triage)](#marco-0-gestión-común-de-triage)

[5. Marco metodológico 1: Gestión de requerimientos (BAU) [23](#marco-metodológico-1-gestión-de-requerimientos-bau)](#marco-metodológico-1-gestión-de-requerimientos-bau)

[5.1 Objetivo [23](#objetivo)](#objetivo)

[5.2 Alcance [24](#alcance)](#alcance)

[5.3 Flujo operativo [24](#flujo-operativo)](#flujo-operativo)

[5.4 Control de cambios en los requerimientos [29](#control-de-cambios-en-los-requerimientos)](#control-de-cambios-en-los-requerimientos)

[5.5 Pre-proyecto: validación en la Mesa de Demanda y paso a Marco 2 [30](#pre-proyecto-validación-en-la-mesa-de-demanda-y-paso-a-marco-2)](#pre-proyecto-validación-en-la-mesa-de-demanda-y-paso-a-marco-2)

[5.6 POC / Estimaciones: método [31](#poc-estimaciones-método)](#poc-estimaciones-método)

[5.7 Etapas de ejecución de los subprocesos (común a Marco 1 y Marco 2) [32](#etapas-de-ejecución-de-los-subprocesos-común-a-marco-1-y-marco-2)](#etapas-de-ejecución-de-los-subprocesos-común-a-marco-1-y-marco-2)

[6. Marco metodológico 2: Gestión de proyectos [34](#marco-metodológico-2-gestión-de-proyectos)](#marco-metodológico-2-gestión-de-proyectos)

[6.1 Objetivo [34](#objetivo-1)](#objetivo-1)

[6.2 Entrada a Marco 2 [34](#entrada-a-marco-2)](#entrada-a-marco-2)

[6.3 Ciclo de vida del proyecto tecnológico [35](#ciclo-de-vida-del-proyecto-tecnológico)](#ciclo-de-vida-del-proyecto-tecnológico)

[6.4 Controles mínimos de proyecto bancario [40](#controles-mínimos-de-proyecto-bancario)](#controles-mínimos-de-proyecto-bancario)

[6.5 Evaluación económica y financiera [41](#evaluación-económica-y-financiera)](#evaluación-económica-y-financiera)

[6.6 Gestión de cambios y reprocesos [41](#gestión-de-cambios-y-reprocesos)](#gestión-de-cambios-y-reprocesos)

[6.7 Participación de las áreas especializadas: acompañan, no deciden [42](#participación-de-las-áreas-especializadas-acompañan-no-deciden)](#participación-de-las-áreas-especializadas-acompañan-no-deciden)

[6.8 Modalidades de ejecución: células dedicadas y proveedores externos [43](#modalidades-de-ejecución-células-dedicadas-y-proveedores-externos)](#modalidades-de-ejecución-células-dedicadas-y-proveedores-externos)

[6.9 Gestión de datos y privacidad [44](#gestión-de-datos-y-privacidad)](#gestión-de-datos-y-privacidad)

[6.10 Dependencias entre proyectos [44](#dependencias-entre-proyectos)](#dependencias-entre-proyectos)

[6.11 Presentación del proyecto ante la Comisión de proyectos [45](#presentación-del-proyecto-ante-la-comisión-de-proyectos)](#presentación-del-proyecto-ante-la-comisión-de-proyectos)

[7. Modelo de priorización [46](#modelo-de-priorización)](#modelo-de-priorización)

[7.1 Criterios y pesos [47](#criterios-y-pesos)](#criterios-y-pesos)

[7.2 Ejemplos resueltos [49](#ejemplos-resueltos)](#ejemplos-resueltos)

[7.3 Reglas de decisión [49](#reglas-de-decisión)](#reglas-de-decisión)

[7.4 Capacidad por área y matriz de capacidades [51](#capacidad-por-área-y-matriz-de-capacidades)](#capacidad-por-área-y-matriz-de-capacidades)

[7.5 Conflictos de capacidad entre ítems con capacidad comprometida [53](#conflictos-de-capacidad-entre-ítems-con-capacidad-comprometida)](#conflictos-de-capacidad-entre-ítems-con-capacidad-comprometida)

[8. Gobierno: roles y comisiones [54](#gobierno-roles-y-comisiones)](#gobierno-roles-y-comisiones)

[8.1 Modelo de gobierno [54](#modelo-de-gobierno)](#modelo-de-gobierno)

[8.2 Responsabilidades por rol [58](#responsabilidades-por-rol)](#responsabilidades-por-rol)

[8.3 Sponsor, PM de demanda, PM de proyecto y PMO [62](#sponsor-pm-de-demanda-pm-de-proyecto-y-pmo)](#sponsor-pm-de-demanda-pm-de-proyecto-y-pmo)

[8.4 RACI [64](#raci)](#raci)

[9. Artefactos obligatorios e instrumentos [68](#artefactos-obligatorios-e-instrumentos)](#artefactos-obligatorios-e-instrumentos)

[9.0 Mapa de etapa a instrumento (lectura rápida) [68](#mapa-de-etapa-a-instrumento-lectura-rápida)](#mapa-de-etapa-a-instrumento-lectura-rápida)

[9.1 Ficha única de demanda y triage [74](#ficha-única-de-demanda-y-triage)](#ficha-única-de-demanda-y-triage)

[9.2 Hoja de priorización (scoring simplificado) [77](#hoja-de-priorización-scoring-simplificado)](#hoja-de-priorización-scoring-simplificado)

[9.3 Ficha de pre-proyecto y caso de negocio ligero [79](#ficha-de-pre-proyecto-y-caso-de-negocio-ligero)](#ficha-de-pre-proyecto-y-caso-de-negocio-ligero)

[9.4 Historia de usuario / especificación funcional [81](#historia-de-usuario-especificación-funcional)](#historia-de-usuario-especificación-funcional)

[9.5 Acta de constitución del proyecto [82](#acta-de-constitución-del-proyecto)](#acta-de-constitución-del-proyecto)

[9.6 Matriz de riesgos del proyecto [83](#matriz-de-riesgos-del-proyecto)](#matriz-de-riesgos-del-proyecto)

[9.7 Hoja de costo y retorno (TCO simple · ROI · payback) [84](#hoja-de-costo-y-retorno-tco-simple-roi-payback)](#hoja-de-costo-y-retorno-tco-simple-roi-payback)

[9.8 Plan de transición a producción y cambio [85](#plan-de-transición-a-producción-y-cambio)](#plan-de-transición-a-producción-y-cambio)

[9.9 Solicitud de control de cambios [87](#solicitud-de-control-de-cambios)](#solicitud-de-control-de-cambios)

[9.10 Acta de sesión con decisiones [87](#acta-de-sesión-con-decisiones)](#acta-de-sesión-con-decisiones)

[9.11 Seguimiento de beneficios (post-implementación) [88](#seguimiento-de-beneficios-post-implementación)](#seguimiento-de-beneficios-post-implementación)

[9.12 Ficha de proveedor (simplificada) [89](#ficha-de-proveedor-simplificada)](#ficha-de-proveedor-simplificada)

[9.13 Evaluación de impacto en datos y privacidad (simplificada) [89](#evaluación-de-impacto-en-datos-y-privacidad-simplificada)](#evaluación-de-impacto-en-datos-y-privacidad-simplificada)

[9.14 Bitácora de reevaluación de diferidos [91](#bitácora-de-reevaluación-de-diferidos)](#bitácora-de-reevaluación-de-diferidos)

[9.15 Ficha de cierre operativo (Marco 1) [92](#ficha-de-cierre-operativo-marco-1)](#ficha-de-cierre-operativo-marco-1)

[9.16 Documento de definiciones [92](#documento-de-definiciones)](#documento-de-definiciones)

[9.17 Matriz de capacidades por área [93](#matriz-de-capacidades-por-área)](#matriz-de-capacidades-por-área)

[9.18 Informe de estado del proyecto [94](#informe-de-estado-del-proyecto)](#informe-de-estado-del-proyecto)

[9.19 Acta de cierre de proyecto [95](#acta-de-cierre-de-proyecto)](#acta-de-cierre-de-proyecto)

[10. Indicadores de control y valor [96](#indicadores-de-control-y-valor)](#indicadores-de-control-y-valor)

[10.1 Cuadro de indicadores [96](#cuadro-de-indicadores)](#cuadro-de-indicadores)

[10.2 Semaforización de cumplimiento de plazo [98](#semaforización-de-cumplimiento-de-plazo)](#semaforización-de-cumplimiento-de-plazo)

[11. Roadmap de implantación y plazos objetivo [100](#roadmap-de-implantación-y-plazos-objetivo)](#roadmap-de-implantación-y-plazos-objetivo)

[11.1 Roadmap de implantación de 60 días [100](#roadmap-de-implantación-de-60-días)](#roadmap-de-implantación-de-60-días)

[11.2 Plazos objetivo y umbral de alerta por categoría [101](#plazos-objetivo-y-umbral-de-alerta-por-categoría)](#plazos-objetivo-y-umbral-de-alerta-por-categoría)

[11.3 Plazos máximos hasta la decisión [102](#plazos-máximos-hasta-la-decisión)](#plazos-máximos-hasta-la-decisión)

[12. Anexos operativos [103](#anexos-operativos)](#anexos-operativos)

[12.1 Checklist de calidad antes de aprobar un proyecto [103](#checklist-de-calidad-antes-de-aprobar-un-proyecto)](#checklist-de-calidad-antes-de-aprobar-un-proyecto)

[12.2 Antipatrones que el marco debe evitar [104](#antipatrones-que-el-marco-debe-evitar)](#antipatrones-que-el-marco-debe-evitar)

[12.3 Política de revisión técnica temprana (consultiva) [104](#política-de-revisión-técnica-temprana-consultiva)](#política-de-revisión-técnica-temprana-consultiva)

[12.4 Custodia y control de cambios de este marco [105](#custodia-y-control-de-cambios-de-este-marco)](#custodia-y-control-de-cambios-de-este-marco)

[12.5 Diagramas de proceso (BPMN) [106](#diagramas-de-proceso-bpmn)](#diagramas-de-proceso-bpmn)

[13. Glosario operativo [106](#glosario-operativo)](#glosario-operativo)

[14. Bibliografía y fuentes verificables [114](#bibliografía-y-fuentes-verificables)](#bibliografía-y-fuentes-verificables)

[Nota final de implementación [114](#nota-final-de-implementación)](#nota-final-de-implementación)

