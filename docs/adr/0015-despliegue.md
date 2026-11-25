# ADR-0015: Despliegue: Compose para piloto, Kubernetes para producción

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** Apache 2.0 / MPL 2.0

## Contexto
El destino final es on-premise o nube privada con Kubernetes portable; el piloto debe ser simple de instalar.

## Decisión
Fases 0 a 7: imágenes OCI y un `compose.prod.yml` de referencia para un servidor del cliente. Fase 8: chart de Helm, OpenTofu para infraestructura y Argo CD para GitOps.

## Alternativas consideradas
Kubernetes desde la fase 0 (costo de tiempo que retrasó Orbyta).

## Consecuencias
El código no asume Compose: configuración por variables de entorno, sin estado local.
