# Fase 1 · Configuración base de la empresa

**Objetivo:** que una empresa nazca desde una plantilla y su administrador ajuste organización, roles, taxonomía, estrategia y calendario sin tocar código.

**Lee antes de empezar:** `docs/specs/parametrizacion.md` §1 a §4, `docs/specs/dominio.md` §3.1, `plantillas/marco-tic-banca/{empresa,organizacion,gobierno,taxonomia,estrategia}.yaml`.

## Historias (en este orden; una spec por historia)

1. **Esquemas de plantilla.** Esquemas zod (y JSON Schema exportado) en `packages/contracts/plantillas/` para `plantilla`, `empresa`, `organizacion`, `gobierno`, `taxonomia`, `estrategia`. Un comando `pnpm plantillas:validar <ruta>` informa archivo, ruta y motivo de cada error.
2. **Importar plantilla** a una empresa nueva o existente (en borrador), en una sola transacción, con validación de referencias cruzadas. Exportar la configuración vigente en el mismo formato.
3. **Administración › Empresa:** nombre, marca (logo, color primario con verificación de contraste), zona horaria, calendario laboral y feriados (importar CSV de feriados), formatos de identificador con vista previa.
4. **Administración › Organización:** árbol de áreas con tipos; activar/desactivar (no borrar si hay referencias).
5. **Administración › Roles:** catálogo de roles funcionales; asignación de usuarios con alcance (empresa o área); sincronización de usuarios desde Keycloak al primer inicio de sesión.
6. **Administración › Gobierno (datos):** instancias, miembros, voto/voz, regla de quórum (constructor simple), frecuencia. Las decisiones permitidas se editan en la fase 4.
7. **Administración › Taxonomía:** grupos, categorías con flags, etapas, estados, tramos, marcas y catálogos.
8. **Administración › Estrategia:** directrices, objetivos con vigencia, OKR por área.
9. **Versionado y auditoría de configuración:** cada publicación crea versión; bitácora con antes/después; validador de coherencia global (base técnica P13).

## Fuera de alcance
Flujos, instrumentos, árbol, priorización, capacidad y plazos (fases 2 a 6).

## Criterios de aceptación
- `demo-banco` se crea con `marco-tic-banca` y `demo-pyme` con `generica-simple`, desde la interfaz y desde un comando.
- Renombrar un área en `demo-banco` no afecta a `demo-pyme` ni rompe nada (prueba).
- Un archivo de plantilla con una referencia rota se rechaza sin escribir nada.
- Exportar e importar la configuración de una empresa en otra produce la misma configuración (prueba de ida y vuelta).
- Todas las pantallas pasan axe y la prueba de aislamiento.

## Demo de cierre
El responsable crea una empresa nueva desde la interfaz eligiendo plantilla, cambia su logo, renombra "Tecnología" a "Sistemas" y carga los feriados de Ecuador del año.
