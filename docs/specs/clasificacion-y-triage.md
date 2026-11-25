# Spec: clasificación y triage (flujo de entrada)

Fuente: `docs/referencia/marco/04-taxonomia-y-triage-marco0.md` y `img/bpmn-marco0-triage.png`.

## 1. Canal único

- Formulario público interno "Nueva demanda" (sección A de la ficha de entrada). Cualquier usuario autenticado de la empresa puede registrar; el área solicitante se precarga con su área y puede cambiarse si pertenece a varias.
- Al enviar: se asigna DEM (formato de la empresa), estado inicial y tramo `triage`, se notifica a la secretaría de la instancia de triage y al solicitante.
- Detección de posibles duplicados (similitud de título y descripción con demandas abiertas del mismo proceso o aplicación, usando `pg_trgm`): se muestran al registrar y en el triage; nunca bloquean.
- Borradores: el solicitante puede guardar y volver.

## 2. Bandeja de triage

Lista de demandas en tramo triage con días hábiles transcurridos frente al plazo máximo (3 en la plantilla bancaria) y alerta visual. Acciones por demanda: **validar completitud**, **devolver** (con detalle obligatorio de lo que falta; abre plazo de reingreso de 10 días hábiles, al vencer se cancela), **marcar duplicado de**, **clasificar**.

## 3. Árbol de clasificación (servicio del dominio)

Configurado en `arbol-clasificacion.yaml`:

```yaml
filtro: { pregunta: "¿La necesidad está bien definida?", si_no: devolver }
determinantes:            # basta un sí → proyecto
  - { clave: p2, texto: "¿Requiere una contratación nueva y específica o una inversión que se aprueba con acta?", ayuda: "..." }
factores:                 # se cuentan solo si todas las determinantes son no
  - { clave: f1, texto: "Tres o más áreas involucradas" }
umbral_factores: 3
entrada_directa:          # condiciones para ir directo al flujo de proyectos
  - { clave: presupuesto_plan_anual, texto: "Presupuesto asignado en el plan anual" }
  - { clave: mandato_regulatorio, texto: "Mandato regulatorio verificado", requiere_verificacion: true }
  - { clave: mandato_directorio, texto: "Mandato del Directorio" }
resultado:
  requerimiento: { grupo: requerimientos }
  proyecto_con_entrada_directa: { grupo: proyectos, etapa: proyecto_entrada_directa }
  proyecto_sin_entrada_directa: { grupo: proyectos, etapa: pre_proyecto }
```

- La interfaz guía paso a paso (filtro → determinantes → factores solo si aplica → entrada directa solo si es proyecto) y muestra el resultado y su porqué. El evaluador puede **sugerir** la categoría con la regla de precedencia (origen → propósito → por defecto) definida en `taxonomia.yaml` → `precedencia`; el PM decide y, si elige otra, deja la razón.
- El resultado se guarda en la sección B (`resultado_arbol`: respuestas, factores marcados, conteo, decisión) y en `clasificacion.*` del contexto del motor.
- Factor de esfuerzo: se marca automáticamente si la estimación de la sección A supera el umbral configurado (20 días-persona o 4 semanas en la plantilla); el PM puede corregirlo con razón.

## 4. Verificación del origen normativo

Si el solicitante o el triage declaran origen normativo (o la categoría tiene `requiere_verificacion_origen`), se crea en paralelo una tarea para el área verificadora (Cumplimiento en la plantilla) con plazo de 2 días hábiles: confirmar existencia, aplicabilidad, fecha límite y parte normativa del alcance.

- Confirmado: marca `origen_normativo_verificado`, habilita entrada directa por mandato.
- No confirmado: el triage clasifica sin origen normativo.
- Vencido sin respuesta: el triage clasifica con la declaración del área y queda pendiente; si al final de la fase de análisis no se confirma, el sistema propone retirar origen y marca (tarea a la instancia que gobierna).
- La entrada directa por mandato regulatorio **no procede** sin confirmación (regla del flujo, no de la interfaz).

## 5. Enrutamiento

Según el resultado: requerimiento o pre-proyecto → `traspaso` al flujo de requerimientos; proyecto de entrada directa → `traspaso` al flujo de proyectos. Pre-proyecto recibe su PPY en el traspaso. Todo queda en bitácora y se notifica al solicitante ("clasificada").

## 6. Criterios de aceptación de la fase 3 (resumen)

1. Un usuario registra una demanda y recibe su DEM en pantalla y por correo.
2. El PM de demanda devuelve una demanda incompleta; el solicitante la completa y reingresa; si no lo hace en 10 días hábiles, se cancela sola.
3. Los cuatro ejemplos resueltos del marco (§4.4) dan el resultado esperado en pruebas automatizadas.
4. Una demanda con origen normativo no entra directo al flujo de proyectos hasta que la verificación se confirma.
5. Con la plantilla genérica (sin árbol ni verificación) el mismo canal único funciona.
