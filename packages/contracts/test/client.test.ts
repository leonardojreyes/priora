import { afterEach, describe, expect, it, vi } from 'vitest';
import { getHealth } from '../src/index';
import type { HealthDto } from '../src/index';

const responder = (cuerpo: HealthDto, status: number) => {
  const fetchMock = vi.fn(async () => {
    return new Response(JSON.stringify(cuerpo), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('cliente generado', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('getHealth hace GET a /health y devuelve datos y estado 200', async () => {
    const cuerpo: HealthDto = { status: 'ok', version: '0.0.0', db: 'up' };
    const fetchMock = responder(cuerpo, 200);

    const respuesta = await getHealth();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(String(url).endsWith('/health')).toBe(true);
    expect(init.method).toBe('GET');
    expect(respuesta.status).toBe(200);
    expect(respuesta.data).toEqual(cuerpo);
  });

  it('getHealth devuelve el estado 503 con db down', async () => {
    responder({ status: 'error', version: '0.0.0', db: 'down' }, 503);

    const respuesta = await getHealth();

    expect(respuesta.status).toBe(503);
    expect((respuesta.data as HealthDto).db).toBe('down');
  });
});
