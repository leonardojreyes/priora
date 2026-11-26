import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { configurarApp } from './app.factory';
import { AppModule } from './app.module';
import { cargarConfig } from './config';

const bootstrap = async (): Promise<void> => {
  const config = cargarConfig(process.env);
  const app = await NestFactory.create(AppModule.register({ databaseUrl: config.databaseUrl }));
  configurarApp(app);
  app.enableShutdownHooks();
  await app.listen(config.port);
  console.log(`API escuchando en el puerto ${config.port} (OpenAPI en /api/docs)`);
};

bootstrap().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
