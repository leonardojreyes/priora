import 'reflect-metadata';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { generarOpenApi } from './app.factory';
import { AppModule } from './app.module';

// Escribe el contrato OpenAPI sin levantar el servidor ni conectar a ninguna base (el pool es perezoso).
// Uso: node dist/generar-openapi.js <ruta de salida>
const generar = async (): Promise<void> => {
  const salida = process.argv[2];
  if (!salida) throw new Error('Uso: generar-openapi <ruta de salida>');

  const app = await NestFactory.create(
    AppModule.register({ databaseUrl: 'postgresql://127.0.0.1:1/priora' }),
    { logger: false },
  );
  try {
    const texto = `${JSON.stringify(generarOpenApi(app), null, 2)}\n`;
    mkdirSync(dirname(resolve(salida)), { recursive: true });
    writeFileSync(salida, texto);
  } finally {
    await app.close();
  }
};

generar().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
