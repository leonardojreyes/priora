# ADR-0010: Reglas configurables con JSONLogic

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
Flujos, instrumentos y árboles necesitan condiciones configurables, seguras y serializables, sin permitir código arbitrario.

## Decisión
JSONLogic (`json-logic-js`) con operadores propios registrados (`dias_habiles_entre`, `banda`, `tiene_marca`, `en_categoria_con_flag`). Se compila y valida al publicar una definición.

## Alternativas consideradas
CEL (más expresivo, bibliotecas JS menos maduras); expresiones JavaScript evaluadas (inseguro).

## Consecuencias
El editor visual (fase 7) ofrece un constructor de reglas para no escribir JSONLogic a mano.
