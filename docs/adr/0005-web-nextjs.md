# ADR-0005: Web con Next.js, Tailwind y shadcn/ui

- **Estado:** Aceptado (2026-11-25)
- **Fecha:** 2026-11-25
- **Licencias involucradas:** MIT

## Contexto
Aplicación interna de uso intensivo en tablas, formularios dinámicos y tableros.

## Decisión
Next.js (App Router) con autenticación OIDC (Auth.js o cliente OIDC equivalente con PKCE), Tailwind + shadcn/ui, TanStack Query + cliente generado (ADR-0011), formularios dinámicos con react-hook-form + zod construido desde la definición del instrumento, next-intl para textos.

## Alternativas consideradas
Angular; Vite + React SPA (más liviano, pero sin el patrón de rutas de servidor que se usará en tableros).

## Consecuencias
Si el consumo de memoria del servidor de desarrollo es un problema en la M1, usar `next dev --turbo` y limitar tareas paralelas.
