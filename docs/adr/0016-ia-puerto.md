# ADR-0016: IA: puerto definido, implementación diferida

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
La primera versión usable no requiere IA. Casos futuros: sugerir grupo y categoría en el triage, redactar la ficha a partir de un texto libre, resumir el expediente para la sesión.

## Decisión
Se documenta el puerto `AsistenteIA` en el dominio y no se implementa. Al activarse (fase 9): LiteLLM autogestionado, modelos locales (Ollama/vLLM) para datos que no pueden salir, política por empresa y selección por usuario, conforme al estándar SynapTech A5.

## Alternativas consideradas
SDK directo de un proveedor (descartado por el estándar).

## Consecuencias
—
