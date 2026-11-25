# Spec: parametrización por empresa y plantillas

## 1. Principio

**Todo lo que difiere entre empresas es dato, no código.** El código implementa mecanismos genéricos (motor, formularios, scoring, sesiones, capacidad, plazos); la empresa los configura. Una empresa nueva se crea desde una **plantilla** y luego se ajusta en la administración.

Prueba de fuego (obligatoria en CI desde la fase 3): la suite de recorrido de punta a punta corre con **dos plantillas** distintas (`marco-tic-banca` y `generica-simple`). Si una funcionalidad solo pasa con una, está cableada.

## 2. Qué se configura

| Elemento | Qué se ajusta | Pantalla (fase) | Archivo de plantilla |
| --- | --- | --- | --- |
| Empresa | Nombre, marca, zona horaria, calendario laboral y feriados, formatos de ID, módulos activos | Administración › Empresa (1) | `empresa.yaml` |
| Organización | Áreas y jerarquía, tipos de área, responsables | Administración › Organización (1) | `organizacion.yaml` |
| Roles funcionales | Catálogo de roles y asignaciones por alcance | Administración › Roles (1) | `organizacion.yaml` |
| Instancias de gobierno | Tipo, miembros, voto o voz, quórum, frecuencia, decisiones permitidas, exigencia de capacidad | Administración › Gobierno (1, decisiones en 4) | `gobierno.yaml` |
| Taxonomía | Grupos, categorías y sus flags, etapas, estados, tramos, catálogos | Administración › Taxonomía (1) | `taxonomia.yaml` |
| Plan estratégico | Directrices, objetivos, OKR de áreas | Administración › Estrategia (1) | `estrategia.yaml` |
| Árbol de clasificación | Pregunta de filtro, preguntas determinantes, factores, umbral, condiciones de entrada directa | Administración › Clasificación (3) | `arbol-clasificacion.yaml` |
| Instrumentos | Secciones, campos, validaciones, visibilidad condicional, quién edita cada sección | Administración › Instrumentos (2) | `instrumentos/*.yaml` |
| Flujos | Nodos, responsables, compuertas, plazos, acciones | Importar/validar (2), editor visual (7) | `flujos/*.yaml` |
| Modelos de priorización | Criterios, pesos (suman 1), anclas 1/3/5, bandas, núcleo común, banderas | Administración › Priorización (4) | `priorizacion.yaml` |
| Capacidad | Áreas obligatorias, unidad (horas-persona), horizonte, regla estricta y excepciones | Administración › Capacidad (4) | `capacidad.yaml` |
| Plazos | Plazos máximos por tramo, plazo objetivo y umbral amarillo por categoría, cadencias de diferido, topes de inicio programado | Administración › Plazos (2, semáforo en 6) | `plazos.yaml` |
| Umbrales de cambio | Magnitudes y aprobadores para cambios en requerimientos y proyectos | Administración › Cambios (4/5) | `cambios.yaml` |
| Notificaciones | Plantillas de mensaje por evento | Administración › Notificaciones (6) | `notificaciones.yaml` |
| Indicadores | Cuáles se muestran, metas, ventana de N meses | Administración › Indicadores (6) | `indicadores.yaml` |

## 3. Formato de plantilla

```
plantillas/<clave>/
├── plantilla.yaml           # metadatos: nombre, versión, descripción, idioma, dependencias de módulos
├── empresa.yaml
├── organizacion.yaml
├── gobierno.yaml
├── taxonomia.yaml
├── estrategia.yaml          # ejemplos; la empresa carga los suyos
├── arbol-clasificacion.yaml
├── priorizacion.yaml
├── capacidad.yaml
├── plazos.yaml
├── cambios.yaml
├── instrumentos/*.yaml
├── flujos/*.yaml
└── casos-prueba.yaml        # demandas de ejemplo con el recorrido esperado
```

- Todos los archivos se validan con **esquemas JSON (zod → JSON Schema)** publicados en `packages/contracts/plantillas/`. Un error de validación indica archivo, ruta y motivo.
- Las referencias entre archivos son por `clave` (p. ej., un flujo refiere `instancia: mesa-demanda`). El importador resuelve y valida todas las referencias antes de escribir nada (transacción única).
- Importar una plantilla en una empresa existente crea **versiones nuevas en borrador**; nada se publica sin confirmación del administrador.
- Exportar la configuración vigente de una empresa produce el mismo formato (respaldo, migración entre ambientes, base para otra empresa).

## 4. Reglas de edición segura

1. Toda definición es versionada; publicar una versión no altera ítems en curso.
2. Cambiar pesos o criterios de un modelo de priorización crea versión nueva; las evaluaciones guardan la versión usada.
3. No se borra un elemento referenciado (área con demandas, categoría usada): se **desactiva**.
4. Cada cambio de configuración deja evento de auditoría con usuario, antes y después.
5. Un validador de coherencia global corre al publicar: pesos que suman 1, bandas sin huecos, todas las categorías con plazo y umbral, todas las instancias con quórum, todas las decisiones usadas en flujos permitidas en su instancia.

## 5. Plantillas incluidas

- `marco-tic-banca`: traducción del marco de referencia (tres flujos, 19 instrumentos, dos modelos, tres instancias + revisión ejecutiva). Nombres de áreas neutrales y renombrables.
- `generica-simple`: empresa mediana sin comités formales (un flujo: registro → evaluación → aprobación del gerente de TI → ejecución → cierre). Sirve para pruebas y para clientes que empiezan con poca formalidad.
