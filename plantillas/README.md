# Plantillas de configuración

Una plantilla es el paquete de configuración con el que nace una empresa en Priora. Formato y reglas: `docs/specs/parametrizacion.md`. Lenguaje de flujos: `docs/specs/motor-flujos.md`. Lenguaje de instrumentos: `docs/specs/instrumentos.md`.

| Plantilla | Para qué | Estado |
| --- | --- | --- |
| `marco-tic-banca/` | Traducción del marco de referencia (banca). Tres flujos + dos subprocesos, árbol de clasificación, dos modelos de priorización, tres instancias + revisión ejecutiva, plazos y umbrales | Completa salvo los instrumentos listados en `plantilla.yaml › pendientes`, que se escriben en su fase |
| `generica-simple/` | Empresa mediana sin comités. Un flujo, un modelo, aprobación del gerente | Completa |

## Reglas

1. Estos archivos son **la fuente de verdad del comportamiento**. Si el código necesita un dato que no está aquí, primero se agrega a la spec y al esquema, luego a la plantilla, y solo después al código.
2. Se validan en CI con los esquemas de `packages/contracts/plantillas/` (fase 2) y con la verificación de grafos de flujo (enlaces rotos, nodos inalcanzables, decisiones sin salida por defecto).
3. `casos-prueba.yaml` de cada plantilla es la suite de aceptación: si un caso falla, la funcionalidad no está terminada.
4. No pongas nombres propios de un cliente. Los nombres de áreas son neutrales y cada empresa los renombra en la administración.
