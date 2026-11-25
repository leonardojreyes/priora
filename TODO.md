# TODO · Backlog de Priora

> Qué falta, en orden. Cada casilla es una **historia vertical** (base de datos + API + interfaz + pruebas) que deja algo visible; no se divide por capas. El detalle de cada historia y sus tareas vive en `docs/fases/` y, cuando se escribe, en `docs/specs/features/`. Marca `[x]` solo cuando la historia cumple sus criterios de aceptación y su PR está fusionado.
>
> Reglas: una tarea por sesión (`/implement`); cada tarea termina con su comando de verificación en verde; al cerrar una historia, actualiza este archivo y `docs/fase0/estado.md` y ejecuta `/clear`.

## Fase 0 · Esqueleto (FASE0.md)
- [x] 0.1 Decisiones fundacionales y ADR aceptados
- [ ] 0.2 Monorepo, Compose y esqueleto que levanta con `pnpm bootstrap && pnpm dev`
- [ ] 0.3 Context engineering verificado (hooks en macOS y Windows, módulo `ping` generado sin correcciones)
- [ ] 0.4 CI que bloquea un PR con secreto, licencia GPL e importación prohibida
- [ ] 0.5 Look and feel aprobado (tokens, ~15 componentes, 5 pantallas plantilla)
- [ ] 0.6 Keycloak, empresa en contexto, RLS, bitácora y prueba de aislamiento con dos empresas
- [ ] 0.7 STRIDE, clasificación de datos, LOPDP, cabeceras y límite de tasa

## Fase 1 · Configuración base
- [ ] Esquemas de plantilla y `pnpm plantillas:validar` con esquemas zod
- [ ] Importar y exportar plantilla (transacción única, referencias cruzadas)
- [ ] Administración › Empresa (marca, calendario, feriados, formatos de ID)
- [ ] Administración › Organización (áreas y tipos)
- [ ] Administración › Roles (catálogo, asignación por alcance, sincronización con Keycloak)
- [ ] Administración › Gobierno (instancias, miembros, quórum)
- [ ] Administración › Taxonomía (grupos, categorías y flags, estados, tramos, marcas, catálogos)
- [ ] Administración › Estrategia (directrices, objetivos, OKR)
- [ ] Versionado, auditoría de configuración y validador de coherencia

## Fase 2 · Motor y formularios
- [ ] Esquemas de flujo e instrumento
- [ ] Validador de definiciones
- [ ] Calendario laboral con feriados
- [ ] Evaluador de reglas JSONLogic con operadores propios
- [ ] Intérprete con todos los tipos de nodo (cobertura ≥ 90%)
- [ ] Persistencia, API y worker de flujos (efectos, temporizadores, secuencias de ID)
- [ ] Formularios dinámicos (render, validación, emisión por sección, versiones)
- [ ] Mi bandeja
- [ ] Ficha de la demanda v1 (línea de tiempo y diagrama)
- [ ] Administración › Flujos e instrumentos v1 (subir, validar, publicar, exportar BPMN)
- [ ] Administración › Plazos (tramos) y vencimientos en el worker
- [ ] `generica-simple` recorrida de punta a punta

## Fase 3 · Entrada y triage — piloto de entrada
- [ ] Canal único "Nueva demanda"
- [ ] Detección de duplicados
- [ ] Bandeja de triage (validar, devolver, cancelar por vencimiento, duplicado)
- [ ] Árbol de clasificación guiado y sugerencia de categoría
- [ ] Verificación del origen normativo
- [ ] Enrutamiento a requerimientos o proyectos con PPY
- [ ] Mis demandas / Demandas de mi área
- [ ] Notificaciones de la fase

## Fase 4 · Requerimientos — MVP
- [ ] Instrumentos de la fase (9.3 A, 9.4, 9.8, 9.9 CHG-DEM, 9.13, 9.15, 9.16)
- [ ] Modelos de priorización (administración y versionado)
- [ ] Pantalla de evaluación
- [ ] Reglas de decisión con recomendación
- [ ] Capacidad (reportes, consolidado, regla estricta, saturación)
- [ ] Sesiones (agenda, quórum, decisiones, acta PDF)
- [ ] Revisión ejecutiva
- [ ] Diferidos y bitácora 9.14
- [ ] Inicio programado
- [ ] Ejecución (subprocesos construir y certificar-implementar)
- [ ] Cierre con expediente completo
- [ ] Control de cambios en requerimientos
- [ ] Conflictos de capacidad entre requerimientos
- [ ] Despliegue del piloto con `compose.prod.yml`

## Fase 5 · Proyectos
- [ ] Instrumentos (9.3 completa, 9.5, 9.6, 9.7, 9.11, 9.12, 9.18, 9.19, 9.9 CHG-PRY)
- [ ] Levantamiento con dos entradas y plazo de 30 días hábiles
- [ ] Validación de alineación
- [ ] Sesión de la Comisión y asignación de PRY
- [ ] Discovery
- [ ] Firmas y conformidades
- [ ] Tres frentes en paralelo con informes recurrentes
- [ ] Control de cambios por magnitud
- [ ] Dependencias y lista de proyectos activos
- [ ] Conflictos de capacidad entre marcos
- [ ] Cierre y beneficios

## Fase 6 · Plazos e indicadores — versión completa
- [ ] Semáforo y casos borde
- [ ] Suspensión y reactivación
- [ ] Plazos máximos hasta la decisión
- [ ] 14 indicadores
- [ ] Tableros (instancia, cartera regulatoria, proyectos activos, mi área)
- [ ] Notificaciones configurables
- [ ] Exportación Excel/CSV
- [ ] Encuesta CSAT

## Fase 7 · Administración avanzada
- [ ] Editor visual de flujos
- [ ] Constructor de reglas
- [ ] Editor de instrumentos
- [ ] Editor de árbol y modelos con simulador
- [ ] Migración de instancias entre versiones
- [ ] Comparación de versiones
- [ ] Asistente de nueva empresa
- [ ] Guía de la empresa

## Fase 8 · Producción
- [ ] Helm, OpenTofu y Argo CD
- [ ] Instalación dedicada y base dedicada
- [ ] S3, respaldos y restauración probada
- [ ] Observabilidad completa
- [ ] Trivy, SBOM y ASVS nivel 2
- [ ] Pruebas de carga
- [ ] Firma electrónica de actas
- [ ] Integraciones (API, webhooks, importador histórico)
- [ ] Manuales
- [ ] Paquete de due diligence

## Fase 9 · IA (opcional)
- [ ] Validar casos de uso con el responsable
- [ ] Implementar los aprobados según ADR-0016
