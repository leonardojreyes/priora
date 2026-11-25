# Spec: instrumentos (formularios dinámicos)

## 1. Concepto

Un **instrumento** es un formulario versionado con secciones, campos, reglas de visibilidad y de obligatoriedad, y permisos por sección. Se renderiza en la web a partir de su definición (react-hook-form + zod generado en tiempo de ejecución). Los datos se guardan en `registro_instrumento.datos` (JSONB) validados contra la versión de la definición. Los campos marcados `nucleo: <campo>` se copian además a la columna tipada de la demanda (para filtros, índices y reglas).

## 2. Lenguaje de definición

```yaml
clave: ficha-demanda
nombre: Ficha única de demanda y triage
codigo_visible: "9.1"            # el que usa la empresa
version: 1
emision: por_seccion             # por_seccion | completo
secciones:
  - clave: A
    titulo: La completa el área solicitante
    editable_por: [{ rol_demanda: solicitante }]
    campos:
      - { clave: titulo, tipo: texto, etiqueta: Título, obligatorio: true, max: 150, nucleo: titulo }
      - { clave: urgencia, tipo: lista, catalogo: urgencia, obligatorio: true, nucleo: urgencia_declarada }
      - clave: justificacion_fecha
        tipo: texto_largo
        obligatorio_si: { "!!": [{ var: datos.fecha_requerida }] }
```

### 2.1 Tipos de campo

`texto`, `texto_largo`, `numero`, `moneda`, `porcentaje`, `fecha`, `si_no`, `lista` (catálogo o `opciones`), `lista_multiple`, `usuario`, `area`, `objetivo_estrategico`, `demanda_ref` (vínculo a otra demanda), `adjunto` (va al expediente), `tabla` (filas con columnas tipadas, p. ej. riesgos), `calculado` (expresión JSONLogic de solo lectura), `firma` (conformidad con usuario y fecha), `arbol_clasificacion` (componente guiado del árbol de la empresa; guarda respuestas, factores y resultado).

### 2.2 Reglas por campo

`obligatorio`, `obligatorio_si`, `visible_si`, `editable_si`, `min`/`max`, `patron`, `ayuda` (texto corto bajo el campo), `referencia_marco` (p. ej., "4.4", se muestra como enlace a la guía de la empresa), `solo_lectura` (lo llena otra tarea o el sistema), `dato_personal` (clasificación LOPDP).

Modificadores de origen y efecto: `catalogo` (catálogo de la taxonomía), `catalogo_marca` (valores de una marca), `fuente` (`areas`, `grupos`, `categorias`, `categorias_del_grupo`, `arbol.entrada_directa`), `filtro_area_tipo`, `hijo_de` (dependiente de otro campo), `sugerencia` (p. ej. `precedencia`, propone un valor que el usuario puede cambiar), `calculado_desde`, `nucleo` (copia a la columna tipada de la demanda), `marca` (actualiza la marca de la demanda), `asigna_rol_demanda` (el usuario elegido recibe ese rol en la demanda), `multiple`, `columnas` (para `tabla`).

Contexto de las reglas de un instrumento: `datos.*` (el formulario en edición), `registros.<instrumento>.<seccion>.*` (otros registros de la demanda), `demanda.*` y `sugerencia.*` (valores propuestos por el sistema, p. ej. la categoría por precedencia).

### 2.3 Ciclo del registro

`borrador` → `emitido` (inmutable) → nueva versión si se corrige. La emisión puede ser por sección (la ficha 9.1 emite A al ingresar, B al clasificar). Una tarea del flujo declara qué instrumento y sección exige para completarse.

## 3. Instrumentos de la plantilla bancaria y fase en que se implementan

| Código | Instrumento | Clave | Fase | Fuente en el marco | Notas de producto |
| --- | --- | --- | --- | --- | --- |
| 9.1 | Ficha única de demanda y triage | `ficha-demanda` | 3 | 09-instrumentos §9.1 | Definición completa en la plantilla. Parte B la llena el triage con el árbol (componente propio) |
| 9.2 | Hoja de priorización | `hoja-priorizacion` | 4 | §9.2 | No es formulario libre: es la pantalla del módulo de priorización (ver `priorizacion-capacidad-sesiones.md`) |
| 9.3 | Ficha de pre-proyecto y caso de negocio ligero | `ficha-preproyecto` | 4 (parte A) · 5 (completa) | §9.3 | Se completa en Marco 2 sin rehacerla |
| 9.4 | Historia de usuario | `historia-usuario` | 4 | §9.4 | Relación 1:N con la demanda salvo flag `relacion_historia: 1:1`. Bloque POC/Estimación visible por categoría |
| 9.5 | Acta de constitución | `acta-constitucion` | 5 | §9.5 | Bloque "Resultado del Discovery" condicionado a la categoría |
| 9.6 | Matriz de riesgos | `matriz-riesgos` | 5 | §9.6 | Campo `tabla` |
| 9.7 | Hoja de costo y retorno | `costo-retorno` | 5 | §9.7 | Campos calculados: TCO 3 años, ROI, payback |
| 9.8 | Plan de transición a producción | `plan-transicion` | 4 | §9.8 | Bloqueo si hay observación crítica abierta |
| 9.9 | Solicitud de control de cambios | `solicitud-cambio` | 4 (CHG-DEM) · 5 (CHG-PRY) | §9.9, 5.4, 6.6 | La magnitud elige aprobador según `cambios.yaml` |
| 9.10 | Acta de sesión | — | 4 | §9.10 | **Generada** por el módulo de sesiones (PDF), no se llena a mano |
| 9.11 | Seguimiento de beneficios | `seguimiento-beneficios` | 5 | §9.11 | |
| 9.12 | Ficha de proveedor | `ficha-proveedor` | 5 | §9.12 | NDA como adjunto obligatorio antes de compartir información |
| 9.13 | Evaluación de datos y privacidad | `evaluacion-privacidad` | 4 | §9.13 | Pronunciamiento vinculante en supuestos de mayor exposición |
| 9.14 | Bitácora de diferidos | — | 4 | §9.14 | **Generada** por el módulo de diferimientos |
| 9.15 | Ficha de cierre operativo | `cierre-operativo` | 4 | §9.15 | Verifica expediente completo antes de cerrar |
| 9.16 | Documento de definiciones | `definiciones` | 4 | §9.16 | |
| 9.17 | Matriz de capacidades | — | 4 | §9.17 | Pantalla del módulo de capacidad |
| 9.18 | Informe de estado | `informe-estado` | 5 | §9.18 | |
| 9.19 | Acta de cierre de proyecto | `acta-cierre` | 5 | §9.19 | Firmas: sponsor, PM de proyecto, PMO, área financiera |

Para escribir la definición YAML de cada instrumento, abre **solo** la subsección correspondiente de `docs/referencia/marco/09-instrumentos.md` y traslada sus campos uno a uno; conserva los nombres de campo del marco en `etiqueta` y usa `clave` en snake_case sin tildes.

## 4. Artefacto mínimo por categoría

La regla "qué instrumentos exige cada categoría" (marco §9.0.2) se configura en `taxonomia.yaml` → `categorias[].instrumentos_minimos`, y la ficha de cierre la verifica. No se codifica.

## 5. Expediente

Cada demanda tiene un expediente con todos sus registros emitidos y adjuntos. Nombre normalizado `{ID}_{codigo}_v{n}_{AAAA-MM-DD}`. Clasificación de acceso por documento (`publico_interno`, `restringido`, `confidencial`). Almacenamiento por puerto: sistema de archivos en desarrollo, compatible S3 (SeaweedFS) en producción (ADR-0009).
