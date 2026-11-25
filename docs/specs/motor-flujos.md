# Spec: motor de flujos parametrizable

> Decisión: ADR-0004 (motor propio, no motor BPMN). El motor ejecuta **definiciones versionadas** escritas en un lenguaje declarativo (YAML/JSON) que cada empresa adapta. BPMN 2.0 se usa para **exportar y documentar**, no para ejecutar.

## 1. Objetivos

1. Que una empresa cambie áreas, pasos, responsables, compuertas, plazos e instrumentos **sin tocar código**.
2. Que las reglas del dominio (árbol de clasificación, scoring, quórum, capacidad, diferidos) sean **servicios del dominio** que el flujo invoca, no lógica escondida en el flujo.
3. Trazabilidad total: cada paso deja un evento inmutable.
4. Ejecución determinista y verificable con pruebas unitarias sin base de datos.

## 2. Arquitectura

- `packages/workflow-engine` (TypeScript puro, sin NestJS ni base de datos): validador de definiciones, intérprete, evaluador de reglas, calendario laboral. Núcleo funcional: recibe estado + comando y devuelve nuevo estado + eventos + efectos solicitados.
- `modules/flujos` (NestJS, hexagonal): persistencia de definiciones e instancias, ejecución de efectos (notificar, asignar ID, crear registro), API de bandeja de tareas.
- `apps/worker`: temporizadores y vencimientos con **pg-boss** sobre PostgreSQL (sin Redis en la fase inicial).
- Concurrencia: bloqueo optimista (`version` en la instancia). Comandos idempotentes con `comando_id`.

## 3. Lenguaje de definición

```yaml
clave: m1-requerimientos          # único por empresa
nombre: Gestión de requerimientos
version: 3                        # entero; las instancias vivas siguen en su versión
contexto_inicial: { tramo: analisis }
inicio: definir-requisitos
nodos:
  - id: definir-requisitos
    tipo: tarea
    nombre: Definir requisitos funcionales
    responsable: { rol_demanda: dueno_funcional }
    instrumentos: [{ clave: historia-usuario, modo: editar, obligatorio: true }]
    plazo: { dias_habiles: 5, desde: entrada_nodo, al_vencer: [{ notificar: { plantilla: tarea-vencida, a: { rol: pm_demanda } } }] }
    acciones_usuario:
      - { clave: completar, etiqueta: Completar, a: requiere-proveedor }
  - id: requiere-proveedor
    tipo: decision
    reglas:
      - { si: { "==": [{ var: registros.historia-usuario.requiere_proveedor }, true] }, a: cotizar }
    por_defecto: analizar
```

### 3.1 Tipos de nodo

| Tipo | Uso | Campos clave |
| --- | --- | --- |
| `tarea` | Trabajo humano en la bandeja | `responsable`, `instrumentos`, `acciones_usuario`, `plazo`, `condicion_completar`, `recurrente` (crea un registro periódico mientras la tarea siga abierta, p. ej. informe de estado cada 10 dh) |
| `decision` | Compuerta exclusiva automática | `reglas` (en orden), `por_defecto` (obligatorio) |
| `decision_humana` | Compuerta exclusiva que resuelve una persona | `responsable`, `opciones[]` con `a` y `requiere_justificacion` |
| `paralelo` / `union` | Bifurcación y unión AND | `ramas[]` / `espera: [ids]` |
| `inclusivo` / `union_inclusiva` | Bifurcación OR con condiciones; la unión espera solo las ramas activadas | `ramas[]` con `si` |
| `sesion` | El ítem va a la agenda de una instancia y espera su decisión | `instancia`, `motivo`, `requisitos`, `revision_previa`, `decisiones` |
| `temporizador` | Espera o cadencia | `dias_habiles` \| `dias_calendario` \| `hasta: <expr fecha>`; `repetir` |
| `subflujo` | Invoca otro flujo y espera su fin | `flujo`, `mapear_resultado` |
| `accion` | Tarea de sistema | `acciones[]` |
| `traspaso` | Termina este flujo e inicia otro para la misma demanda | `flujo`, `acciones[]` |
| `fin` | Termina | `resultado`: `completado`, `rechazado`, `devuelto`, `cancelado`, `derivado` |

### 3.2 Responsables

Uno de: `{ rol: <rol funcional> }` (cualquiera con ese rol en su alcance), `{ rol_demanda: dueno_funcional | sponsor | responsable_asignado | solicitante | pm_proyecto }`, `{ area: <codigo> }`, `{ instancia: <clave> }` (secretaría de la instancia), `{ expr: <regla que devuelve usuario> }`. `area` y `rol` se pueden combinar (personas con ese rol dentro de esa área). Una tarea asignada a un grupo se **toma** antes de trabajarla.

### 3.3 Sesión (nodo de gobierno)

```yaml
  - id: priorizar
    tipo: sesion
    instancia: mesa-demanda
    motivo: priorizar
    requisitos:
      - { evaluacion_vigente: modelo-requerimientos }
      - { capacidad_completa: true, excepto_si: { var: demanda.marcas.fecha_externa } }
    revision_previa:                # revisión ejecutiva opcional y vinculante
      instancia: revision-ejecutiva
      ventana: hasta_sesion        # si no se pronuncia, sigue
      si_desfavorable: { a: devuelto-por-revision }
    decisiones:
      - { clave: prioritario, a: hay-capacidad }
      - { clave: diferir, a: diferido, acciones: [{ iniciar_diferimiento: { desde_instancia: true } }] }   # o { cadencia_dias: 15, maximo: 2 }
      - { clave: rechazar, a: rechazado, requiere_justificacion: true }
```

Cada decisión puede llevar `si` (regla) para ofrecerse solo en ciertos casos (p. ej., `validar_elevar` solo si la etapa es pre-proyecto). Una decisión `diferir` devuelve el token al mismo nodo `sesion` con el tramo `diferido`; el ítem reaparece en la agenda cuando vence su reevaluación.

Las decisiones que no mueven el token (`elevar_conflicto`, `tomar_conocimiento`, `aprobar_cambio`, `rechazar_cambio`) las procesa el módulo de gobierno sobre sus propios registros; el flujo solo declara las que lo mueven.

El módulo de gobierno arma la agenda con los tokens que esperan en nodos `sesion`, verifica requisitos y quórum y, al registrar la decisión, llama a `motor.registrarDecision(token, clave, datos)`.

### 3.4 Acciones de sistema

`asignar_identificador {tipo}` · `cambiar_estado {valor}` · `cambiar_tramo {valor}` · `cambiar_grupo_categoria {etapa? | desde: decision | categoria_desde: <ruta>}` · `asignar_rol_demanda {rol, desde: creador | <ruta>}` · `traspasar_seguimiento {a: <responsable>}` · `notificar {plantilla, a: [responsables]}` · `crear_registro {instrumento, prellenar_desde?}` · `emitir_registro {instrumento, seccion?}` · `iniciar_diferimiento {desde_instancia: true | cadencia_dias, maximo}` · `fijar_fecha {campo, valor: hoy | desde: <ruta>}` · `marcar {marca, valor}` · `vincular {tipo, desde: <ruta>}` · `registrar_evento {tipo, datos?}`.

`<ruta>` es una ruta del contexto de reglas (p. ej. `vars.responsable`, `decision.fecha_inicio_programado`).

Las acciones son un **catálogo cerrado** implementado en código y probado. Una empresa no puede inyectar código.

### 3.5 Reglas

Se escriben en **JSONLogic** (biblioteca `json-logic-js`, MIT) sobre un contexto de solo lectura:

- `demanda.*` (campos núcleo, marcas, identificadores)
- `registros.<instrumento>.*` (última versión emitida o borrador vigente)
- `clasificacion.*` (resultado del árbol: `grupo`, `determinantes_si`, `factores`, `es_proyecto`)
- `evaluacion.*` (total, banda, núcleo común, banderas)
- `decision.*` (última decisión de sesión)
- `capacidad.*` (alcanza, falta_reporte)
- `vars.*` (variables del flujo)
- `config.*` (umbrales de la empresa)

Operadores propios registrados: `dias_habiles_entre`, `banda`, `tiene_marca`, `en_categoria_con_flag`.

### 3.6 Referencia completa de campos (lo que usan las plantillas incluidas)

**Del flujo**: `clave`, `nombre`, `version`, `dispara` (evento que lo inicia: `demanda_creada`; sin él solo se inicia por `traspaso` o `subflujo`), `contexto_inicial`, `parametros` (con `por_defecto`; los fija quien invoca un `subflujo`), `inicio`, `nodos`.

**Comunes a todo nodo**: `id`, `tipo`, `nombre`, `al_entrar` (acciones al llegar), `salidas` (`[{a, si?}]`, la primera cuya regla se cumpla; la última sin `si` es la salida por defecto).

**`tarea`**: `responsable` (admite `alternativa` y `parametro`), `colaboradores` (ven y comentan, no completan), `instrumentos` (lista de `{clave, seccion?, campos?, modo: editar|emitir|firmar|validar, obligatorio?, si?, firmas?}` o `{evaluacion: <modelo>, criterios?, modo?}`), `preguntas` (campos propios del flujo, se guardan en `vars.*`, admiten `prellenar` y `filtro_rol`), `acciones_usuario` (`{clave, etiqueta, a, si?, requiere_justificacion?, acciones?}`), `condicion_completar` (regla o condiciones nombradas: `expediente_completo`, `subflujos_terminados: [ids]`), `plazo` (`{tramo}` para usar la tabla de plazos de la empresa, o `{dias_habiles|dias_calendario, al_vencer}`), `recurrente`.

**`decision_humana`**: `responsable`, `opciones` (`{clave, etiqueta, a, requiere_justificacion?}`).

**`sesion`**: `instancia`, `motivo` (texto o `{si, entonces, sino}`), `requisitos` (condiciones nombradas: `evaluacion_vigente`, `alineacion_validada`, `capacidad_completa` con `excepto_si`, `presentacion_sponsor_adjunta`, `sin_bloqueo_privacidad`), `revision_previa` (`instancia`, `omitir_si`, `si_desfavorable`), `decisiones` (`{clave, a, si?, requiere_justificacion?, maximo?, acciones?}`).

**`temporizador`**: `hasta` (regla que devuelve fecha) o `dias_habiles`/`dias_calendario`; `recordatorio_previo` (`{dias_calendario, crear_tarea}`).

**`subflujo`**: `flujo`, `parametros`, `salidas`. **`traspaso`**: `flujo`, `acciones`. **`fin`**: `resultado`, `acciones`.

Toda clave nueva que una plantilla necesite se agrega primero aquí, luego al esquema zod en `packages/contracts`, luego al intérprete con su prueba. Una clave desconocida es un error de validación, nunca se ignora en silencio.

## 4. Validación de una definición (al importar o publicar)

Rechaza la definición si: hay nodos inalcanzables o sin salida; una `decision` no tiene `por_defecto`; una `union` espera ramas que no existen; un `responsable` refiere un rol, área o instancia inexistente en la empresa; un instrumento o modelo no existe; una regla no compila; una acción no está en el catálogo; un `subflujo` crea un ciclo. Devuelve errores con la ruta del campo.

## 5. Versionado y publicación

Estados de una definición: `borrador` → `publicada` → `retirada`. Solo una versión publicada por clave. Las instancias vivas siguen en la versión con que nacieron; una herramienta administrativa (fase 7) migra instancias con un mapa de nodos y deja evento.

## 6. Plazos y calendario

- Calendario laboral por empresa: días hábiles de la semana, feriados por año (importables), zona horaria.
- `plazo` de un nodo programa un trabajo pg-boss; al vencer ejecuta `al_vencer`, una lista de acciones del catálogo más `mover {a: <nodo>}` (cierra la tarea y mueve el token) y `escalar {a: <responsable>}` (reasigna y notifica).
- Los plazos máximos hasta la decisión y los umbrales del semáforo vienen de la tabla de plazos de la empresa (`plazos-semaforo-indicadores.md`), no de los nodos.

## 7. Interfaz de bandeja y vista del flujo

- **Mi bandeja**: tareas asignadas o tomables, filtros por tramo, vencimiento y categoría.
- **Ficha de la demanda**: línea de tiempo de eventos, nodo actual resaltado sobre el diagrama del flujo, instrumentos, decisiones, expediente.
- **Diagrama**: generado desde la definición con React Flow (MIT) y diseño automático con dagre (MIT), en carriles por responsable. Solo lectura hasta la fase 7 (editor visual).
- **Exportación BPMN 2.0 XML**: mapeo `tarea→userTask`, `accion→serviceTask`, `decision→exclusiveGateway`, `paralelo→parallelGateway`, `inclusivo→inclusiveGateway`, `temporizador→intermediateCatchEvent(timer)`, `subflujo→callActivity`, `sesion→userTask` con extensión `priora:session`.

## 8. Pruebas mínimas del motor

- Cada tipo de nodo, incluida la unión inclusiva con ramas no activadas.
- Los tres flujos de la plantilla bancaria recorridos de punta a punta con datos de `plantillas/marco-tic-banca/casos-prueba.yaml`.
- La plantilla genérica recorrida de punta a punta (demuestra que nada está cableado a la plantilla bancaria).
- Idempotencia, concurrencia (dos decisiones simultáneas sobre el mismo token) y vencimientos con feriados.
