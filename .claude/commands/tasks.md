---
description: Divide un plan aprobado en tareas pequeñas, ordenadas y verificables.
argument-hint: <ruta de la spec>
---
Divide el plan técnico de $ARGUMENTS en tareas.

Reglas:
- Cada tarea cabe en una sesión (idealmente < 300 líneas cambiadas), deja el repositorio en verde y tiene un criterio de terminado verificable con un comando.
- Orden: esquemas y contratos → dominio con pruebas → infraestructura y migraciones → API → interfaz → e2e.
- Marca dependencias entre tareas.

Agrega al final de la spec una sección **Tareas** con una lista numerada `[ ] T1 · título · criterio de terminado · comando de verificación`. Espera aprobación.
