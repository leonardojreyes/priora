import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { version } from './version';

/** `/health` queda fuera del prefijo; el resto de la API de negocio vive bajo `/api/v1`. */
export const configurarApp = (app: INestApplication): void => {
  app.setGlobalPrefix('api/v1', { exclude: ['health'] });
  SwaggerModule.setup('api/docs', app, generarOpenApi(app));
};

/** El contrato OpenAPI se genera siempre desde el código (ADR-0011). */
export const generarOpenApi = (app: INestApplication): OpenAPIObject =>
  SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Priora API')
      .setVersion(version)
      .setOpenAPIVersion('3.1.0')
      .build(),
  );
