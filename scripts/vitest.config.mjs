import { defineConfig } from 'vitest/config';

// Las pruebas de integración crean y eliminan bases y roles en el mismo servidor PostgreSQL y
// comparan instantáneas de lo ajeno: los archivos se ejecutan uno tras otro.
export default defineConfig({ test: { fileParallelism: false } });
