# ADR-0009: Almacenamiento de archivos por puerto

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** Apache 2.0

## Contexto
El expediente guarda adjuntos con clasificación de acceso; los bancos exigen almacenamiento en su infraestructura.

## Decisión
Puerto `AlmacenDocumentos` con dos adaptadores: disco local (desarrollo) y API S3 (SeaweedFS u otro compatible en producción). Prefijo por empresa. Verificación de tipo MIME y tamaño máximo.

## Alternativas consideradas
Guardar binarios en PostgreSQL (simple pero pesado para respaldos).

## Consecuencias
El adaptador S3 se prueba en fase 8.
