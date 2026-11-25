# Fase 9 · IA embebida (opcional)

**Objetivo:** asistir sin decidir. La IA sugiere; una persona confirma y la sugerencia queda en la bitácora.

**Lee antes de empezar:** ADR-0016 y la sección A5 del estándar SynapTech (skill `fase0-producto-synaptech`).

## Casos de uso candidatos (validar con el responsable antes de empezar)
1. **Redacción asistida** de la ficha de entrada a partir de un texto libre o un correo pegado.
2. **Sugerencia de grupo, categoría y factores** del árbol, con el porqué, en la bandeja de triage.
3. **Detección semántica de duplicados** (embeddings con pgvector).
4. **Resumen del expediente** para la agenda de una sesión.
5. **Borrador de justificación** de una decisión a partir de la evaluación y la recomendación.

## Reglas
- Puerto `AsistenteIA` en el dominio; gateway LiteLLM autogestionado; modelos locales (Ollama/vLLM) cuando los datos no pueden salir de la empresa.
- Política por empresa (modelos permitidos, predeterminado, BYOK), selección por usuario, límites de gasto y medición.
- Controles OWASP Top 10 para LLM, prompts versionados, evaluaciones antes de cambiar prompt o modelo.
- Nunca decide: no clasifica, no prioriza ni aprueba por sí sola.
