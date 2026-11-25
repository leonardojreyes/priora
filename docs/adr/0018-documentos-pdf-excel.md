# ADR-0018: Generación de PDF y Excel

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
Las actas de sesión, las fichas emitidas y los reportes deben exportarse.

## Decisión
pdfmake para PDF (sin navegador headless) con plantillas por empresa; exceljs para exportar vistas tabulares.

## Alternativas consideradas
Playwright/Chromium para imprimir HTML (pesado en memoria); @react-pdf/renderer.

## Consecuencias
Firma electrónica de actas en fase 8 (evaluar integración con proveedores ecuatorianos).
