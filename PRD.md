# PRD · Priora

> Fuente única de verdad del **qué y el porqué** del producto. Es un resumen: el detalle vive en `docs/specs/` y se enlaza, no se copia. Si cambia una regla, se cambia en la spec y aquí solo si cambia el resumen.

## 1. Visión

Que toda la demanda de tecnología de una organización entre por una sola puerta, se clasifique con reglas, se priorice contra la capacidad real y se decida en instancias formales con trazabilidad completa, con un sistema que cada empresa adapta a su propia metodología sin programar.

## 2. Problema

En empresas medianas y grandes (y sobre todo en bancos), un ajuste menor, una exigencia regulatoria y un proyecto estratégico llegan por canales distintos (correo, pasillo, mensajes) y se discuten con el mismo nivel de detalle. El resultado: trabajo duplicado, equipos de TI saturados, decisiones de inversión por insistencia y no por análisis, y poca evidencia para auditoría y regulador. Las herramientas ITSM gestionan tickets, no el gobierno de la demanda; las de portafolio son caras y rígidas.

## 3. Usuarios y roles

| Rol | Qué hace en Priora |
| --- | --- |
| Solicitante / dueño funcional | Registra la necesidad, ve su estado, aprueba definiciones y entregas |
| PM de demanda | Clasifica, pre-prioriza, prepara sesiones, da seguimiento hasta el traspaso |
| PMO | Administra metodología, consolida capacidad, preside o acompaña instancias, cierra proyectos |
| Miembro de instancia (mesa, comité, comisión) | Revisa la agenda y decide en sesión |
| Revisor ejecutivo | Se pronuncia, si quiere, antes de que una instancia decida |
| Áreas consultivas y verificadoras | Emiten observaciones, verifican origen normativo, evalúan privacidad |
| Responsable de capacidad | Reporta capacidad de su área antes de cada sesión |
| PM de proyecto / responsable asignado | Ejecuta, informa, transita a producción |
| Administrador de la empresa | Configura organización, flujos, formularios, modelos y plazos |

Los nombres concretos de roles, áreas e instancias los define cada empresa (`docs/specs/dominio.md` §2).

## 4. Alcance

- **MVP (al cerrar la fase 4):** canal único, triage con árbol de clasificación, priorización con modelo ponderado, matriz de capacidad, sesiones con quórum y acta PDF, revisión ejecutiva, diferidos, ejecución y cierre de requerimientos, validación de pre-proyectos. Multiempresa y dos plantillas.
- **Versión completa (fase 6):** + ciclo de proyectos completo, semáforo, plazos máximos, 14 indicadores, cartera regulatoria, notificaciones y exportación.
- **Producto instalable (fase 8):** + editor visual de configuración, Kubernetes, respaldos, observabilidad, firma de actas, integraciones.
- **Fuera de alcance:** gestión de incidentes, mesa de servicio ITSM, gestión de sprints y tareas técnicas, app móvil (por ahora), IA (fase 9 opcional).

## 5. Flujos principales

1. **Registrar una necesidad** → el solicitante llena la ficha de entrada en el canal único; recibe su identificador. *Spec:* `docs/specs/clasificacion-y-triage.md` §1.
2. **Clasificar y enrutar** → el PM de demanda valida completitud (o devuelve), aplica el árbol, asigna categoría y marcas, y el sistema enruta al flujo que corresponde. *Spec:* `clasificacion-y-triage.md` §2 a §5.
3. **Priorizar y decidir en sesión** → evaluación con el modelo de la instancia, capacidad consolidada, agenda automática, revisión ejecutiva, quórum, decisión por ítem y acta. *Spec:* `docs/specs/priorizacion-capacidad-sesiones.md`.
4. **Ejecutar y cerrar un requerimiento** → responsable y fecha, definiciones, desarrollo, certificación, UAT, pase a producción, cierre con expediente completo. *Flujo:* `plantillas/marco-tic-banca/flujos/m1-requerimientos.yaml`.
5. **Gobernar un proyecto** → levantamiento y caso de negocio, costo y retorno, aprobación en comisión, acta, ejecución en tres frentes, transición, cierre y beneficios. *Flujo:* `flujos/m2-proyectos.yaml`.
6. **Configurar una empresa** → crear desde plantilla y ajustar organización, flujos, formularios, modelos y plazos. *Spec:* `docs/specs/parametrizacion.md`.
7. **Seguir y medir** → semáforo, plazos, tableros por instancia, indicadores. *Spec:* `docs/specs/plazos-semaforo-indicadores.md`.

## 6. Pantallas

| Pantalla | Para quién | Fase |
| --- | --- | --- |
| Inicio de sesión y panel | Todos | 0 |
| Nueva demanda (canal único) | Solicitante | 3 |
| Mis demandas / Demandas de mi área | Solicitante, líderes de área | 3 |
| Mi bandeja (tareas) | Todos los que actúan en un flujo | 2 |
| Ficha de la demanda (datos, línea de tiempo, diagrama, instrumentos, expediente) | Todos con acceso | 2 |
| Bandeja de triage | PM de demanda | 3 |
| Evaluación (scoring) | PM de demanda | 4 |
| Capacidad (reporte del área y consolidado) | Responsables de capacidad, PMO | 4 |
| Sesiones (agenda, quórum, decisiones, acta) | Secretaría y miembros de instancia | 4 |
| Revisión ejecutiva | Revisor ejecutivo | 4 |
| Proyectos activos y cartera regulatoria | PMO, comisión | 5 y 6 |
| Tableros e indicadores | Instancias, PMO, dirección | 6 |
| Administración (empresa, organización, roles, gobierno, taxonomía, estrategia, flujos, instrumentos, modelos, capacidad, plazos, notificaciones) | Administrador | 1, 2, 4, 6, 7 |

## 7. Reglas de negocio clave

Las 13 invariantes de `docs/specs/dominio.md` §5 son obligatorias para cualquier empresa. Las más visibles: una sola entrada; nada llega a una instancia sin clasificación; toda demanda declara objetivo estratégico; sin capacidad completa no se prioriza (salvo fecha externa, si la empresa lo configura así); el pronunciamiento ejecutivo desfavorable devuelve el ítem; un diferido no espera indefinidamente; toda decisión tiene sesión con quórum y acta; ningún dato cruza entre empresas. Todo lo demás (umbrales, pesos, plazos, instancias) es configurable.

## 8. Criterios de aceptación del producto

- Los casos de `plantillas/marco-tic-banca/casos-prueba.yaml` y `plantillas/generica-simple/casos-prueba.yaml` pasan en CI.
- Una empresa nueva se configura desde plantilla sin intervención de desarrollo.
- Una auditoría puede reconstruir quién decidió qué, cuándo y con qué información, para cualquier demanda.

## 9. Métricas de éxito (piloto)

- 100% de la demanda de TI del área piloto registrada en Priora en 60 días.
- Lead time de triage dentro de 3 días hábiles en el 90% de los casos.
- 0 sesiones de la instancia sin acta.
- La PMO deja de preparar a mano los informes de sesión.

## 10. Supuestos y riesgos

- **Supuesto:** el primer cliente tiene una metodología formal (como el marco de referencia). **Riesgo:** que la parametrización no cubra una variante → mitigación: dos plantillas desde el día uno y editor visual en la fase 7.
- **Riesgo:** sobrediseño del motor → mitigación: catálogo cerrado de nodos y acciones, ampliado solo cuando una plantilla real lo necesite.
- **Riesgo:** adopción (las áreas siguen pidiendo por correo) → mitigación: canal único simple, notificaciones claras y tableros que la dirección use.
