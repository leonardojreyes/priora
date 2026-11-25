---
description: Crea un ADR nuevo con el formato del proyecto.
argument-hint: <título de la decisión>
---
Crea un ADR para: $ARGUMENTS

1. Lee `docs/adr/README.md` para obtener el siguiente número.
2. Crea `docs/adr/NNNN-<slug>.md` con el formato de `docs/adr/0001-*.md`: Estado **Propuesto**, fecha, licencias involucradas, Contexto, Decisión, Alternativas consideradas, Consecuencias. Si reemplaza a otro, indícalo en ambos (en el viejo, agrega solo la línea `- **Reemplazado por:** ADR-NNNN` justo después de la línea de estado; es la única edición que el hook permite sobre un ADR aceptado).
3. Agrega la fila al índice `docs/adr/README.md`.
4. Si la decisión cambia el stack, actualiza la tabla de `docs/fase0/base-tecnica.md` §3.
5. Presenta el ADR y espera aprobación para marcarlo **Aceptado**.
