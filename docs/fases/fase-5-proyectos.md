# Fase 5 · Proyectos

**Objetivo:** gobernar proyectos desde el levantamiento hasta la verificación de beneficios.

**Lee antes de empezar:** `plantillas/marco-tic-banca/flujos/m2-proyectos.yaml`, `cambios.yaml` (proyectos), `docs/specs/priorizacion-capacidad-sesiones.md` §5. Detalle solo si hace falta: `docs/referencia/marco/06-marco2-proyectos.md`, `09-instrumentos.md` (§9.3, 9.5, 9.6, 9.7, 9.11, 9.12, 9.18, 9.19), `12-anexos-operativos.md` (§12.1 checklist, §12.3 revisión técnica).

## Historias

1. **Instrumentos**: `ficha-preproyecto` completa (9.3) con continuidad desde la parte A, `costo-retorno` (9.7: TCO 3 años, ROI, payback calculados; VAN/TIR opcional si la instancia lo pide), `acta-constitucion` (9.5 con bloque Discovery), `matriz-riesgos` (9.6), `ficha-proveedor` (9.12 con NDA obligatorio), `informe-estado` (9.18), `seguimiento-beneficios` (9.11), `acta-cierre` (9.19), `solicitud-cambio` variante CHG-PRY.
2. **Levantamiento** con sus dos entradas (proyecto propuesto con PPY; entrada directa con DEM) y el plazo de 30 días hábiles hasta la Comisión con "dar plazo una vez o rechazar".
3. **Validación de alineación** por el área de planificación estratégica sobre el criterio del modelo.
4. **Sesión de la Comisión**: requisitos (presentación del sponsor adjunta), cartera regulatoria consolidada adjunta a la agenda, asignación de PRY al aprobar.
5. **Discovery** obligatorio u opcional según la categoría.
6. **Firmas** (conformidades con usuario y fecha) en acta de constitución, decisión de pase y acta de cierre.
7. **Tres frentes en paralelo**: gestión con informes de estado recurrentes, construcción y transición, supervisión de contrato.
8. **Control de cambios** por magnitud, con escalamiento a la Comisión para cambios mayores; actualización de fecha vigente y conteo de reprogramaciones.
9. **Dependencias entre proyectos** (hitos de enganche) y lista de proyectos activos.
10. **Conflictos de capacidad** entre marcos con núcleo común.
11. **Cierre y beneficios** con verificación del área financiera.

## Criterios de aceptación
- El recorrido 2 de `casos-prueba.yaml` (pre-proyecto → proyecto aprobado con DEM, PPY y PRY) pasa en prueba automática.
- Un proyecto de entrada directa por presupuesto del plan anual recorre las seis fases de punta a punta en una prueba e2e.
- Un cambio mayor no se aplica sin decisión de la Comisión; un cambio menor sí, por el PM de proyecto.
- Un proyecto con expediente incompleto no se puede cerrar.

## Demo de cierre
El motor antifraude del marco §7.2 entra como pre-proyecto, se valida, se aprueba en la Comisión con puntaje 4.20, pasa por Discovery y llega a cierre con beneficios verificados.
