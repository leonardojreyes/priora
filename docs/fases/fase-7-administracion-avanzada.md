# Fase 7 · Administración avanzada

**Objetivo:** que un administrador funcional (no programador) adapte Priora a una empresa nueva en días.

**Lee antes de empezar:** `docs/specs/motor-flujos.md` §5 y §7, `docs/specs/parametrizacion.md` §4.

## Historias

1. **Editor visual de flujos** sobre React Flow: arrastrar nodos del catálogo, conectar, editar propiedades en panel lateral, validar en vivo, publicar; carriles por responsable.
2. **Constructor de reglas** (sin escribir JSONLogic): campo + operador + valor, con "y/o"; vista JSON para expertos.
3. **Editor de instrumentos**: secciones y campos con vista previa en vivo.
4. **Editor del árbol de clasificación** y de **modelos de priorización** con simulador ("¿qué puntaje daría este ítem con los pesos nuevos?").
5. **Migración de instancias** entre versiones de un flujo con mapa de nodos y evento de auditoría.
6. **Comparar versiones** de cualquier definición (diff legible).
7. **Asistente de nueva empresa**: elegir plantilla → marca → organización → roles → publicar.
8. **Guía de la empresa**: textos de ayuda por campo y enlace a su propio manual (sustituye las referencias al marco del banco).

## Criterios de aceptación
- Un usuario de prueba sin conocimiento de YAML crea un flujo de aprobación de tres pasos y lo pone en producción en menos de 30 minutos (prueba de usabilidad documentada).
- Migrar 50 instancias vivas de la versión 1 a la 2 de un flujo no pierde ninguna ni duplica tareas.
