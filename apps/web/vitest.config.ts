import { defineConfig } from 'vitest/config';

// Next exige `jsx: preserve` en el tsconfig; para las pruebas el JSX se transforma aquí (Vite 8 usa oxc).
export default defineConfig({
  oxc: { jsx: { runtime: 'automatic' } },
  test: { environment: 'jsdom', include: ['test/**/*.test.tsx', 'test/**/*.test.ts'] },
});
