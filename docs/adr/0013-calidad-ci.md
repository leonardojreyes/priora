# ADR-0013: Calidad y CI en GitHub Actions

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** varias abiertas

## Contexto
Todo cambio debe llegar a main por PR con controles automáticos; no se usa CodeQL (pago en repos privados).

## Decisión
Workflow `ci.yml`: instalar con caché, lint (ESLint), formato (Prettier), tipos, dependency-cruiser, Vitest con PostgreSQL de servicio, validación de plantillas, Playwright de humo, Semgrep CE, OSV-Scanner, gitleaks, verificación de licencias. Protección de rama main. Trivy y SBOM CycloneDX en fase 8.

## Alternativas consideradas
CodeQL; SonarQube (servidor adicional).

## Consecuencias
Un PR que viola una regla queda bloqueado (criterio del paso 0.4).
