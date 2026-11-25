---
description: Inicia una fase de la hoja de ruta (1 a 9).
argument-hint: <número de fase>
---
Inicia la fase $ARGUMENTS.

1. Verifica en `docs/fase0/estado.md` que la fase anterior esté cerrada; si no, dilo y detente.
2. Lee `docs/fases/fase-$ARGUMENTS-*.md` y **solo** los documentos de su sección "Lee antes de empezar".
3. Presenta: objetivo, lista de historias en orden, riesgos que ves, dependencias técnicas y una estimación gruesa en sesiones de trabajo.
4. Propón la primera historia para `/spec` y espera confirmación.
5. Actualiza `docs/fase0/estado.md` con "Fase $ARGUMENTS en curso".
