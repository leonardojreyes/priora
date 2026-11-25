# ADR-0007: Identidad con Keycloak; autorización en dos capas

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** Apache 2.0

## Contexto
Estándar SynapTech: Keycloak. Los permisos del proceso dependen del rol funcional, del rol en la demanda, del área y de la tarea activa.

## Decisión
Keycloak para autenticación y RBAC de plataforma. Permisos de proceso en un servicio de políticas del dominio (`modules/acceso`), con funciones puras probadas. OpenFGA se evaluará si aparecen delegaciones o jerarquías complejas.

## Alternativas consideradas
OpenFGA desde el inicio (un contenedor más y un modelo que aún no se necesita); Cerbos.

## Consecuencias
Keycloak en desarrollo con `start-dev`, realm importado y límite de memoria.
