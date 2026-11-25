# Fase 8 · Listo para producción en un cliente

**Objetivo:** instalar Priora en la infraestructura de un cliente (incluido un banco) y operarlo con garantías.

**Lee antes de empezar:** `docs/fase0/base-tecnica.md` §1 y §3 (lo diferido), `docs/specs/seguridad-y-multiempresa.md`, ADR-0013, 0014, 0015, 0009.

## Historias

1. **Kubernetes**: chart de Helm (api, worker, web), valores por ambiente, probes, recursos, HPA; OpenTofu para la infraestructura de referencia; Argo CD para GitOps.
2. **Modo de instalación dedicada** (una empresa, base propia) y base dedicada por empresa grande.
3. **Almacenamiento S3** (SeaweedFS) probado; respaldos y restauración de PostgreSQL y archivos con procedimiento probado (RPO/RTO documentados).
4. **Observabilidad completa**: Prometheus, Grafana, Loki, Tempo (o integración con la plataforma del cliente); tableros y alertas por empresa.
5. **Seguridad**: Trivy de imágenes, SBOM CycloneDX por versión, prueba de penetración externa o checklist ASVS nivel 2 completo, rotación de secretos con OpenBao o el gestor del cliente.
6. **Rendimiento**: pruebas de carga (k6) con 50 000 demandas y 300 usuarios concurrentes; índices y vistas ajustados.
7. **Firma de actas** con firma electrónica válida en Ecuador (evaluar proveedores e integración por API).
8. **Integraciones**: webhooks salientes y API documentada para ITSM/ERP; importador de demanda histórica desde Excel.
9. **Documentación**: manual de usuario por rol, manual de administración, manual de instalación y operación, notas de versión.
10. **Paquete de due diligence**: arquitectura, STRIDE actualizado, clasificación de datos, LOPDP, licencias, SBOM, resultados de pruebas.

## Criterios de aceptación
- Un ambiente completo se recrea desde cero con un comando en un clúster limpio.
- Restaurar el respaldo de ayer en un ambiente nuevo deja el sistema operativo y consistente (simulacro documentado).
- Sin vulnerabilidades críticas o altas abiertas en imágenes ni dependencias.
