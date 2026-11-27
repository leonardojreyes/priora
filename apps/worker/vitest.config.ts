import { defineConfig } from 'vitest/config';

// Las pruebas de integración usan la base local: se cargan las URLs de `.env.local` si existe.
try {
  process.loadEnvFile('../../.env.local');
} catch {
  // sin .env.local: las pruebas con base real se omiten
}

export default defineConfig({
  test: { include: ['test/**/*.test.ts'], fileParallelism: false },
});
