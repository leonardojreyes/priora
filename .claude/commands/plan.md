---
description: Diseña la solución técnica de una spec, en modo plan, sin editar código.
argument-hint: <ruta de la spec>
---
Diseña la solución para la spec $ARGUMENTS. **No edites código.**

1. Lee la spec, los ADR que apliquen y el `CLAUDE.md` de las carpetas que vas a tocar.
2. Propón: módulos y capas afectadas, archivos a crear o cambiar, entidades y migraciones, contratos de API, cambios en el motor o en esquemas de plantilla, estrategia de pruebas (unidad, integración, aislamiento, e2e), riesgos y alternativas descartadas.
3. Consulta en paralelo a `arquitecto` y, si hay datos personales, a `revisor-cumplimiento`; incorpora sus observaciones.
4. Si el plan contradice un ADR, propone un ADR nuevo en lugar de ignorarlo.
5. Agrega el plan al final de la spec bajo **Plan técnico** y espera aprobación.
