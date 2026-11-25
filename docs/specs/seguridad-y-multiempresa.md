# Spec: seguridad, permisos y multiempresa

## 1. Multiempresa

- Modelo por defecto: base compartida con **Row-Level Security** en PostgreSQL. Cada tabla de negocio tiene `tenant_id uuid not null` y una política `using (tenant_id = current_setting('app.tenant_id')::uuid)`. El rol de base de datos de la aplicación **no** es dueño de las tablas ni tiene `BYPASSRLS`.
- La empresa se resuelve en un solo lugar: claim `tenant` del token OIDC (un realm de Keycloak por instalación; la empresa como atributo/grupo del usuario). Un interceptor abre la transacción y ejecuta `select set_config('app.tenant_id', $1, true)`. Sin empresa en contexto, la consulta falla (política sin coincidencia y verificación explícita en el repositorio base).
- Trabajos del worker y eventos llevan `tenant_id` y fijan el contexto igual que las peticiones.
- Archivos bajo prefijo `tenants/{tenant_id}/`; registros de log etiquetados con `tenant_id`.
- **Prueba obligatoria por módulo**: con dos empresas sembradas, la empresa B intenta leer, listar, actualizar y borrar datos de A por API y por repositorio; todo debe fallar o devolver vacío.
- Despliegue dedicado (un cliente, su infraestructura) con el mismo código: variable `MODO_INSTALACION=dedicada` fija una sola empresa.

## 2. Autenticación

Keycloak (OIDC, código de autorización con PKCE en la web; tokens de acceso cortos, refresco rotativo). SSO de la empresa (SAML/OIDC/LDAP) se federa en Keycloak, no en la aplicación. En desarrollo, Keycloak en Docker Compose con realm importado y usuarios de prueba por rol.

## 3. Autorización (dos capas)

1. **Permisos de plataforma (RBAC)** en Keycloak: `admin_empresa`, `usuario`, `auditor` (solo lectura total), `admin_plataforma` (SynapTech, sin acceso a datos de negocio salvo soporte auditado).
2. **Permisos de proceso (ABAC, en el dominio)**: se derivan del rol funcional, del rol en la demanda (dueño funcional, sponsor…), del área y de la tarea activa. Ejemplos: solo quien tiene la tarea puede completarla; el solicitante ve sus demandas y las de su área; los miembros de una instancia ven su agenda; documentos `confidencial` solo para roles listados en la clasificación.

Se implementa como **servicio de políticas en el dominio** (`modules/acceso`) con funciones puras probadas (`puede(usuario, accion, recurso, contexto)`). OpenFGA queda como ADR diferido (ADR-0007) para cuando haya delegaciones complejas.

## 4. Auditoría

Bitácora append-only (`evento`) para todo cambio de negocio y de configuración: quién, cuándo, desde dónde, antes/después. Tabla protegida contra `update`/`delete` por trigger. Exportable para auditoría interna.

## 5. Línea base de seguridad (OWASP ASVS nivel 2)

- Validación de entrada en el borde con zod/class-validator; salida codificada; CSP estricta en Next.js.
- Sin secretos en el repositorio: `.env` local (en `.gitignore`), `.env.example` documentado; gitleaks en CI y en hook.
- Dependencias: OSV-Scanner y verificación de licencias en CI.
- Análisis estático: Semgrep CE con reglas de TypeScript y OWASP.
- Cabeceras de seguridad, limitación de tasa en API pública, tamaño máximo de adjuntos y verificación de tipo MIME.
- Datos personales (LOPDP Ecuador): clasificación de campos en las definiciones de instrumento (`dato_personal: true`), minimización, retención configurable, registro de accesos a expedientes `confidencial`.
