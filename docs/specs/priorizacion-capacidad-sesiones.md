# Spec: priorización, capacidad y sesiones de gobierno

Fuentes: `docs/referencia/marco/07-modelo-de-priorizacion.md`, `08-gobierno-roles-y-comisiones.md`, `09-instrumentos.md` (§9.2, §9.10, §9.14, §9.17).

## 1. Modelos de priorización

Configurados en `priorizacion.yaml`. Cada modelo: clave, nombre, a qué grupos o etapas aplica, escala (1 a 5), anclas permitidas sin justificación (1, 3, 5), criterios (`clave`, `nombre`, `peso`, `ancla_1`, `ancla_3`, `ancla_5`, `fuente`: `manual` | `capacidad`), bandas (`alta >= 4.0`, `media >= 3.0`, `baja`), `nucleo_comun` (lista de criterios; si un criterio del núcleo se compone de varios, promedio), banderas disponibles.

Cálculo: `total = Σ calificación × peso`, redondeo a 2 decimales al mostrar, sin redondear al comparar. Núcleo común = promedio simple de sus componentes.

**Pantalla de evaluación** (hoja 9.2): cabecera con ID, objetivo estratégico, marca de fecha externa y modelo; tabla de criterios con anclas visibles al pasar el cursor; justificación obligatoria en 2 y 4; criterio de capacidad prellenado con la sugerencia que sale del reporte de capacidad (editable con razón); total, banda y núcleo en vivo; banderas obligatorias (riesgo regulatorio/ciber alto, fecha límite externa, duplicidad, sin sponsor, sin dueño funcional). Es una **pre-priorización** del PM; la instancia decide en sesión.

Reglas de decisión (servicio `ReglasDecision`), configurables por instancia, devuelven una **recomendación** con su motivo, nunca deciden solas:

| Condición | Recomendación |
| --- | --- |
| Pronunciamiento ejecutivo desfavorable | No entra a la sesión |
| Sin dueño funcional / sin sponsor (según etapa) | No validar ni aprobar |
| Fecha externa no negociable | Ejecutar; si no hay capacidad, escalar conflicto; las bandas no aplican |
| Riesgo regulatorio/ciber alto | Escalar a la instancia aunque el puntaje sea bajo |
| Banda alta y capacidad alcanza | Prioritario inmediato |
| Banda alta y capacidad no alcanza | Prioritario con inicio programado (tope: 30 días en requerimientos, 3 meses en proyectos) tras revisar desplazamiento y capacidad alternativa |
| Banda media | Diferir para refinar |
| Banda baja | Diferir o rechazar |

## 2. Capacidad

- **Reporte de capacidad** (matriz 9.17) por área o equipo y período: total (horas-persona netas), compromisos por ítem (ID, categoría, horas, desde, hasta, estado), restricciones, ventanas de cambio, perfiles saturados (con meses consecutivos), compromisos futuros por inicio programado.
- Los compromisos de ítems gestionados en Priora se **precargan** desde las decisiones (aprobado con horas estimadas); el responsable del área completa lo externo y confirma.
- Cada área obligatoria recibe una tarea "Actualizar capacidad" antes de cada sesión de las instancias que la exigen (plazo configurable, p. ej. 2 días hábiles antes).
- Vista consolidada para la PMO y la sesión: por área, total, comprometida, disponible, ocupación %, semáforo de saturación, y para cada ítem en agenda las horas que requiere de cada área → "cabe / no cabe".
- Regla estricta configurable (`capacidad.yaml`): si falta el reporte de un área obligatoria, la sesión no registra decisiones de priorización, salvo ítems con fecha externa no negociable; la falta queda en el acta. Una sola postergación; la sesión siguiente decide con lo reportado.
- Saturación estructural: si un perfil está saturado N meses seguidos (3 en la plantilla), se crea un punto de agenda automático para la instancia superior.

## 3. Sesiones

**Ciclo**: planificar (fecha, instancia) → **armar agenda** (automática: tokens esperando en nodos `sesion` de esa instancia + reevaluaciones de diferidos vencidas + conflictos de capacidad + cambios que requieren a la instancia; la secretaría ordena y puede agregar puntos de seguimiento) → **publicar agenda** (notifica a miembros; abre la ventana de revisión ejecutiva) → **iniciar** (registrar asistentes; el sistema verifica quórum con la regla de la instancia; sin quórum no se registran decisiones) → **decidir ítem por ítem** (ve evaluación, recomendación, capacidad, pronunciamientos; elige una decisión permitida; justificación obligatoria donde la configuración lo exija) → **cerrar** → **acta** (PDF generado con plantilla de la empresa: asistentes, quórum, capacidad usada, decisiones con justificación, pronunciamientos, condiciones; firma digital opcional en fase 8).

**Decisiones** (catálogo por instancia en `gobierno.yaml`): `prioritario` (inmediato o con inicio programado + fecha + horas reservadas), `diferir`, `rechazar`, `reclasificar` (nueva categoría o grupo), `validar_elevar` (pre-proyecto → proyecto propuesto), `fusionar` (con otra demanda), `elevar_conflicto` (a otra instancia), `aprobar_cambio`, `rechazar_cambio`, `dar_plazo` (una sola vez, no mayor al original), `tomar_conocimiento`.

Cada decisión llama al motor (`registrarDecision`), que ejecuta la transición y sus acciones (asignar PRY, iniciar diferimiento, notificar al área).

**Revisión ejecutiva** (VPEG en la plantilla): al publicar la agenda, el revisor ve los ítems pre-priorizados con puntaje y puede pronunciarse (favorable, con condiciones, desfavorable + justificación) hasta el inicio de la sesión. Desfavorable saca el ítem de la agenda y lo devuelve. Si ya se pronunció sobre el mismo ítem en una etapa anterior, solo se le vuelve a ofrecer si hubo cambio material (cambio de alcance, costo o plazo registrado).

## 4. Diferidos

Al decidir `diferir`: se crea un diferimiento con cadencia y máximo de la instancia (15 días / 2 en requerimientos, 1 mes / 2 en proyectos, en la plantilla). Un temporizador agenda cada reevaluación en la siguiente sesión posterior a la fecha programada. En la última reevaluación la opción `diferir` no está disponible. La bitácora 9.14 se genera desde estos registros.

## 5. Conflictos de capacidad

Cuando atender un ítem exige suspender otro con capacidad comprometida: se registra un conflicto con ambos ítems y sus puntajes; el sistema elige el método de comparación (mismo modelo si son del mismo grupo; núcleo común si son de grupos distintos) y la instancia competente según `gobierno.yaml` (tabla de §7.5 del marco). Salvaguardas como reglas: un ítem con fecha externa no se suspende a favor de otro sin ella; el responsable del ítem afectado debe figurar como invitado de la sesión.
