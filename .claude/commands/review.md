---
description: Revisión en paralelo con los subagentes antes de abrir un PR.
argument-hint: "[rama o rango de commits, por defecto la rama actual contra main]"
---
Revisa los cambios de: $ARGUMENTS (si está vacío, la rama actual contra main).

1. Obtén el diff (`git diff main...HEAD --stat` y el detalle por archivo).
2. Lanza **en paralelo**: `arquitecto`, `revisor-multiempresa`, `revisor-seguridad`, `experto-dominio` (si toca negocio), `auditor-accesibilidad` (si toca `apps/web` o `packages/ui`), `revisor-cumplimiento` (si toca datos personales, expedientes, bitácora o exportaciones).
3. Ejecuta `pnpm lint`, `pnpm typecheck`, `pnpm test` y, si hay cambios de interfaz, `pnpm test:e2e`.
4. Consolida en una tabla: hallazgo, severidad, subagente, archivo:línea, acción. Corrige los bloqueantes y altos; lista los demás como pendientes.
5. Si todo está en verde, redacta el título y la descripción del PR (qué, por qué, cómo probar, capturas si hay interfaz, checklist) y pide permiso para crearlo con `gh pr create`.
