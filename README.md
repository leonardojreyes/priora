# Priora

Sistema multiempresa de gestión de la demanda de requerimientos y proyectos de TI. Producto de SynapTech Ecuador. Priora es el nombre de código; el nombre comercial puede definirse después.

## Cómo arrancar con Claude Code

1. Crea el repositorio privado en GitHub y copia este contenido en él (primer commit en `main`).
2. Abre Claude Code en la raíz del repositorio.
3. Escribe: **"Lee FASE0.md y ejecuta el paso 0.1"**.
4. Al final de cada paso, revisa el reporte y responde **"aprobado"** para seguir.
5. Al terminar cada paso o historia, ejecuta **`/clear`**; en la sesión nueva empieza con **`/estado`**.
6. Ante un error difícil, pide primero **`/diagnosticar <error>`**: Claude encuentra la causa sin tocar archivos y tú apruebas la corrección.

Después de la Fase 0: `/fase 1`, `/fase 2`… (ver `FASE0.md` §9).

## Qué hay aquí

- `PRD.md`: qué es el producto, para quién, alcance, flujos y pantallas.
- `ARCHITECTURE.md`: mapa técnico (contenedores, módulos, modelo de datos, carpetas).
- `TODO.md`: backlog por fase con casillas.
- `FASE0.md`: prompt de arranque y hoja de ruta hasta un sistema usable.
- `CLAUDE.md`: reglas que Claude Code lee en cada sesión.
- `docs/`: base técnica, ADR, specs del producto, fichas por fase, estado vivo y el marco de referencia.
- `plantillas/`: configuración de empresas (`marco-tic-banca`, `generica-simple`).
- `.claude/`: subagentes, comandos, hooks y permisos del proyecto.

## Requisitos (se confirman en el paso 0.2)

Node.js LTS, pnpm, Docker Desktop (o equivalente) y Git. macOS o Windows (con WSL2 recomendado para Docker). 8 GB de RAM como mínimo.

## Confidencialidad

`docs/referencia/` contiene el marco metodológico de un cliente. El repositorio debe ser **privado** y esa carpeta no se distribuye con el producto.
