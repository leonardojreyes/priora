import 'reflect-metadata';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { AppModule } from '../src/app.module';
import { configurarApp } from '../src/app.factory';
import { cargarConfig } from '../src/config';

const DATABASE_URL_APP = process.env.DATABASE_URL_APP;

const crearApp = async (databaseUrl: string) => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule.register({ databaseUrl })],
  }).compile();
  const app = moduleRef.createNestApplication();
  configurarApp(app);
  await app.listen(0);
  const baseUrl = await app.getUrl();
  return { app, baseUrl };
};

const abiertas: INestApplication[] = [];

const levantar = async (databaseUrl: string) => {
  const resultado = await crearApp(databaseUrl);
  abiertas.push(resultado.app);
  return resultado.baseUrl;
};

afterEach(async () => {
  while (abiertas.length > 0) {
    const app = abiertas.pop();
    await app?.close();
  }
});

describe('cargarConfig', () => {
  const urlBase = 'postgres://localhost:5432/priora';

  it('usa el puerto 3001 por defecto', () => {
    const config = cargarConfig({ DATABASE_URL_APP: urlBase });
    expect(config.port).toBe(3001);
    expect(config.databaseUrl).toBe(urlBase);
  });

  it('toma el puerto de API_PORT', () => {
    const config = cargarConfig({ DATABASE_URL_APP: urlBase, API_PORT: '4010' });
    expect(config.port).toBe(4010);
  });

  it('falla si falta DATABASE_URL_APP', () => {
    expect(() => cargarConfig({})).toThrow(/DATABASE_URL_APP/);
  });

  it('falla con un puerto inválido', () => {
    expect(() => cargarConfig({ DATABASE_URL_APP: urlBase, API_PORT: 'abc' })).toThrow();
  });
});

describe.skipIf(!DATABASE_URL_APP)('GET /health con base real', () => {
  it('responde 200 con estado ok y db up', async () => {
    const baseUrl = await levantar(DATABASE_URL_APP as string);
    const respuesta = await fetch(`${baseUrl}/health`);
    expect(respuesta.status).toBe(200);
    expect(respuesta.headers.get('content-type')).toContain('application/json');
    const cuerpo = await respuesta.json();
    expect(cuerpo).toEqual({ status: 'ok', version: expect.any(String), db: 'up' });
    expect(cuerpo.version.length).toBeGreaterThan(0);
  });
});

describe('GET /health con la base caída', () => {
  const urlCaida = new URL('postgres://127.0.0.1:1/priora').toString();

  it('responde 503 con db down y sigue respondiendo', async () => {
    const baseUrl = await levantar(urlCaida);
    for (let intento = 0; intento < 2; intento += 1) {
      const respuesta = await fetch(`${baseUrl}/health`);
      expect(respuesta.status).toBe(503);
      expect(respuesta.headers.get('content-type')).toContain('application/json');
      const cuerpo = await respuesta.json();
      expect(cuerpo).toEqual({ status: 'error', version: expect.any(String), db: 'down' });
    }
  }, 15_000);
});

describe('rutas y documentación', () => {
  const urlCaida = new URL('postgres://127.0.0.1:1/priora').toString();

  it('no expone /api/v1/health', async () => {
    const baseUrl = await levantar(urlCaida);
    const respuesta = await fetch(`${baseUrl}/api/v1/health`);
    expect(respuesta.status).toBe(404);
  });

  it('sirve el documento OpenAPI en /api/docs-json', async () => {
    const baseUrl = await levantar(urlCaida);
    const respuesta = await fetch(`${baseUrl}/api/docs-json`);
    expect(respuesta.status).toBe(200);
    const documento = await respuesta.json();
    expect(documento.openapi.startsWith('3.')).toBe(true);
    expect(Object.keys(documento.paths)).toContain('/health');
  });

  it('sirve Swagger UI en /api/docs', async () => {
    const baseUrl = await levantar(urlCaida);
    const respuesta = await fetch(`${baseUrl}/api/docs`);
    expect(respuesta.status).toBe(200);
    expect(respuesta.headers.get('content-type')).toContain('text/html');
  });
});
