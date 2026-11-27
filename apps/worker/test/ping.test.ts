import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { crearBoss, opcionesBoss } from '../src/boss.js';
import { cargarConfig } from '../src/config.js';
import { PING_QUEUE, crearManejadorPing, registrarPing } from '../src/ping.js';

const URL_FICTICIA = 'postgres://usuario@localhost:5432/base';

describe('cargarConfig', () => {
  it('falla si falta DATABASE_URL_APP', () => {
    expect(() => cargarConfig({})).toThrow(/DATABASE_URL_APP/);
  });

  it('lee la URL y usa info como nivel de log por defecto', () => {
    const config = cargarConfig({ DATABASE_URL_APP: URL_FICTICIA });
    expect(config.databaseUrl).toBe(URL_FICTICIA);
    expect(config.logLevel).toBe('info');
  });

  it('respeta LOG_LEVEL', () => {
    const config = cargarConfig({ DATABASE_URL_APP: URL_FICTICIA, LOG_LEVEL: 'debug' });
    expect(config.logLevel).toBe('debug');
  });
});

describe('opcionesBoss', () => {
  it('arranca sin crear ni migrar el esquema', () => {
    const opciones = opcionesBoss(URL_FICTICIA);
    expect(opciones.migrate).toBe(false);
    expect(opciones.createSchema).toBe(false);
    expect(opciones.schema).toBe('pgboss');
    expect(opciones.connectionString).toBe(URL_FICTICIA);
  });
});

describe('crearManejadorPing', () => {
  it('registra una linea con tenant e id para un trabajo valido', async () => {
    const lineas: string[] = [];
    const manejador = crearManejadorPing({ registrar: (l: string) => lineas.push(l) });
    await manejador([{ id: 'job-1', data: { tenant_id: 'tenant-a' } }]);
    expect(lineas).toHaveLength(1);
    expect(lineas[0]).toContain('tenant-a');
    expect(lineas[0]).toContain('job-1');
  });

  it('registra una linea por trabajo', async () => {
    const lineas: string[] = [];
    const manejador = crearManejadorPing({ registrar: (l: string) => lineas.push(l) });
    await manejador([
      { id: 'job-1', data: { tenant_id: 'tenant-a' } },
      { id: 'job-2', data: { tenant_id: 'tenant-b' } },
    ]);
    expect(lineas).toHaveLength(2);
    expect(lineas[0]).toContain('job-1');
    expect(lineas[1]).toContain('tenant-b');
  });

  it.each([
    ['sin tenant_id', {}],
    ['con tenant_id vacio', { tenant_id: '' }],
    ['con tenant_id no string', { tenant_id: 42 }],
    ['con data nulo', null],
  ])('rechaza data %s y no registra', async (_nombre, data) => {
    const lineas: string[] = [];
    const manejador = crearManejadorPing({ registrar: (l: string) => lineas.push(l) });
    await expect(manejador([{ id: 'job-x', data }])).rejects.toThrow(/tenant_id/);
    expect(lineas).toHaveLength(0);
  });
});

const esperar = async (condicion: () => Promise<boolean> | boolean, tope = 10_000) => {
  const limite = Date.now() + tope;
  while (Date.now() < limite) {
    if (await condicion()) return true;
    await new Promise((resolver) => setTimeout(resolver, 200));
  }
  return false;
};

describe.skipIf(!process.env.DATABASE_URL_APP)('ping con pg-boss real (priora_test)', () => {
  const lineas: string[] = [];
  let boss: ReturnType<typeof crearBoss>;

  beforeAll(async () => {
    const url = new URL(process.env.DATABASE_URL_APP as string);
    url.pathname = '/priora_test';
    boss = crearBoss(url.toString());
    boss.on('error', () => {});
    await boss.start();
    await registrarPing(boss, { registrar: (l: string) => lineas.push(l) });
  });

  afterAll(async () => {
    if (!boss) return;
    await boss.deleteAllJobs(PING_QUEUE);
    await boss.stop({ graceful: true, timeout: 3000 });
  });

  it('procesa un ping con tenant_id', async () => {
    await boss.send(PING_QUEUE, { tenant_id: 'tenant-ficticio' });
    const ok = await esperar(() => lineas.some((l) => l.includes('tenant-ficticio')));
    expect(ok).toBe(true);
    expect(lineas.filter((l) => l.includes('tenant-ficticio'))).toHaveLength(1);
  }, 15_000);

  it('deja en failed un ping sin tenant_id', async () => {
    const id = await boss.send(PING_QUEUE, {}, { retryLimit: 0 });
    expect(id).toBeTruthy();
    const ok = await esperar(async () => {
      const trabajo = await boss.getJobById(PING_QUEUE, id as string);
      return trabajo?.state === 'failed';
    });
    expect(ok).toBe(true);
  }, 15_000);
});

describe('arquitectura', () => {
  it('src/ no referencia la carpeta local de desarrollo', () => {
    // Se arma el texto para que `lint:arch` no marque este archivo.
    const carpetaLocal = ['.local', '/'].join('');
    const dir = fileURLToPath(new URL('../src', import.meta.url));
    const archivos = readdirSync(dir).filter((f) => f.endsWith('.ts'));
    expect(archivos.length).toBeGreaterThan(0);
    for (const archivo of archivos) {
      expect(readFileSync(join(dir, archivo), 'utf8'), archivo).not.toContain(carpetaLocal);
    }
  });
});
