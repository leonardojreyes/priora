---
description: Escribe la spec de una historia o funcionalidad.
argument-hint: <historia o funcionalidad>
---
Escribe la spec de: $ARGUMENTS

1. Lee `docs/fase0/estado.md`, la ficha de la fase en curso y las specs de producto que la ficha nombra.
2. Crea `docs/specs/features/<fase>-<slug>.md` con estas secciones:
   - **Contexto y objetivo** (2 a 4 líneas, con la referencia a la ficha de fase).
   - **Historias de usuario** (rol, necesidad, beneficio).
   - **Reglas de negocio** numeradas, cada una con su fuente (spec de producto o sección del marco) e indicando **qué es configuración** (archivo y clave de plantilla) y qué es mecanismo genérico.
   - **Cambios en configuración y esquemas** (claves nuevas en plantillas, esquemas zod, lenguaje de flujos o instrumentos).
   - **Modelo de datos** afectado (tablas, columnas, RLS).
   - **API** (endpoints, permisos).
   - **Interfaz** (pantallas, estados vacío/carga/error).
   - **Criterios de aceptación** verificables (Dado/Cuando/Entonces), incluidos los casos de `casos-prueba.yaml` que apliquen, la prueba de aislamiento y la regresión con `generica-simple`.
   - **Fuera de alcance**.
   - **Preguntas abiertas**.
3. Pide al subagente `experto-dominio` que la revise y aplica sus observaciones.
4. Presenta un resumen y las preguntas abiertas. No escribas código.
