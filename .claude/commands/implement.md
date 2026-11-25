---
description: Implementa una tarea de la spec con pruebas primero.
argument-hint: <ruta de la spec> <número de tarea>
---
Implementa la tarea indicada en: $ARGUMENTS

1. Lee la spec (solo las secciones necesarias y la tarea), el `CLAUDE.md` de las carpetas a tocar y `docs/fase0/estado.md`.
2. Crea o cambia a la rama `feat/<fase>-<slug>` si no estás en ella.
3. **Pruebas primero:** pide al subagente `ingeniero-pruebas` las pruebas de la tarea y confirma que fallan por la razón correcta.
4. Implementa lo mínimo para ponerlas en verde. Respeta las reglas de `CLAUDE.md` (configuración antes que código, RLS, hexagonal, bitácora).
5. Ejecuta el comando de verificación de la tarea, `pnpm typecheck` y `pnpm lint`.
6. Marca la tarea `[x]` en la spec, haz commit con mensaje convencional (`feat(modulo): ...`) y actualiza `docs/fase0/estado.md`. Si con esta tarea se cumple la historia completa, marca su casilla en `TODO.md`.
7. Si una prueba falla de forma que no entiendes al primer intento, detente y propone `/diagnosticar` en lugar de probar cambios a ciegas.
8. Reporta con el formato de `FASE0.md` §8. **Una tarea por sesión**: no empieces la siguiente sin confirmación. Si cerraste una historia, recomienda `/clear` y `/estado` para la siguiente.
