import { describe, expect, it, vi } from 'vitest';
import {
  formatearResultados,
  urlsPorDefecto,
  verificarEsqueleto,
} from '../lib/verificar-esqueleto.mjs';

const URLS = { api: 'http://127.0.0.1:3001/health', web: 'http://127.0.0.1:3000/' };

const respuesta = (status, cuerpo) => ({
  status,
  ok: status >= 200 && status < 300,
  json: async () => {
    if (cuerpo instanceof Error) throw cuerpo;
    return cuerpo;
  },
  text: async () => (typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo)),
});

const apiOk = () => respuesta(200, { status: 'ok', db: 'up' });
const webOk = () => respuesta(200, '<html></html>');

// fetch simulado que enruta por URL.
const crearFetch = ({ api, web }) =>
  vi.fn(async (url) => {
    const manejador = url === URLS.api ? api : web;
    return manejador();
  });

const porNombre = (r, nombre) => r.resultados.find((x) => x.nombre === nombre);

describe('urlsPorDefecto', () => {
  it('usa los puertos por defecto 3001 y 3000', () => {
    expect(urlsPorDefecto({})).toEqual(URLS);
  });

  it('respeta API_PORT y WEB_PORT', () => {
    expect(urlsPorDefecto({ API_PORT: '4001', WEB_PORT: '4000' })).toEqual({
      api: 'http://127.0.0.1:4001/health',
      web: 'http://127.0.0.1:4000/',
    });
  });

  it('usa el valor por defecto solo para la variable ausente', () => {
    expect(urlsPorDefecto({ WEB_PORT: '8080' })).toEqual({
      api: 'http://127.0.0.1:3001/health',
      web: 'http://127.0.0.1:8080/',
    });
  });
});

describe('verificarEsqueleto', () => {
  it('api y web correctos: ok global y dos resultados', async () => {
    const fetch = crearFetch({ api: apiOk, web: webOk });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(true);
    expect(r.resultados.map((x) => x.nombre).sort()).toEqual(['api', 'web']);
    expect(r.resultados.every((x) => x.ok)).toBe(true);
    expect(r.resultados.every((x) => typeof x.detalle === 'string')).toBe(true);
  });

  it('llama a fetch con la URL de cada servicio y un AbortSignal', async () => {
    const fetch = crearFetch({ api: apiOk, web: webOk });
    await verificarEsqueleto({ fetch, urls: URLS });
    expect(fetch).toHaveBeenCalledTimes(2);
    const urls = fetch.mock.calls.map((c) => c[0]);
    expect(urls).toContain(URLS.api);
    expect(urls).toContain(URLS.web);
    for (const [, opciones] of fetch.mock.calls) {
      expect(opciones.signal).toBeInstanceOf(AbortSignal);
    }
  });

  it('api responde 503: falla con detalle que menciona PostgreSQL y web sigue ok', async () => {
    const fetch = crearFetch({
      api: () => respuesta(503, { status: 'error', db: 'down' }),
      web: webOk,
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(porNombre(r, 'api').ok).toBe(false);
    expect(porNombre(r, 'api').detalle).toMatch(/PostgreSQL/i);
    expect(porNombre(r, 'web').ok).toBe(true);
  });

  it('api 200 con db down: falla y menciona PostgreSQL', async () => {
    const fetch = crearFetch({
      api: () => respuesta(200, { status: 'ok', db: 'down' }),
      web: webOk,
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(porNombre(r, 'api').ok).toBe(false);
    expect(porNombre(r, 'api').detalle).toMatch(/PostgreSQL/i);
  });

  it('api 200 con status distinto de ok: falla', async () => {
    const fetch = crearFetch({
      api: () => respuesta(200, { status: 'degraded', db: 'up' }),
      web: webOk,
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(porNombre(r, 'api').ok).toBe(false);
  });

  it('api con JSON inválido: falla con detalle claro', async () => {
    const fetch = crearFetch({
      api: () => respuesta(200, new SyntaxError('Unexpected token <')),
      web: webOk,
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(porNombre(r, 'api').ok).toBe(false);
    expect(porNombre(r, 'api').detalle).toMatch(/JSON/i);
  });

  it('api con 500: falla e incluye el código de estado', async () => {
    const fetch = crearFetch({ api: () => respuesta(500, 'boom'), web: webOk });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(porNombre(r, 'api').ok).toBe(false);
    expect(porNombre(r, 'api').detalle).toContain('500');
  });

  it('web con 500: falla e incluye el código de estado; api sigue ok', async () => {
    const fetch = crearFetch({ api: apiOk, web: () => respuesta(500, 'boom') });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(porNombre(r, 'web').ok).toBe(false);
    expect(porNombre(r, 'web').detalle).toContain('500');
    expect(porNombre(r, 'api').ok).toBe(true);
  });

  it('error de red solo en web: web falla con nombre, URL y pnpm dev; api ok', async () => {
    const fetch = crearFetch({
      api: apiOk,
      web: () => {
        throw new Error('connect ECONNREFUSED 127.0.0.1:3000');
      },
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    const web = porNombre(r, 'web');
    expect(web.ok).toBe(false);
    expect(web.detalle).toContain('web');
    expect(web.detalle).toContain(URLS.web);
    expect(web.detalle).toContain('pnpm dev');
    expect(porNombre(r, 'api').ok).toBe(true);
  });

  it('error de red solo en api: no se detiene y comprueba web', async () => {
    const fetch = crearFetch({
      api: () => {
        throw new Error('ECONNREFUSED');
      },
      web: webOk,
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    const api = porNombre(r, 'api');
    expect(api.ok).toBe(false);
    expect(api.detalle).toContain('api');
    expect(api.detalle).toContain(URLS.api);
    expect(api.detalle).toContain('pnpm dev');
    expect(porNombre(r, 'web').ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('ambos con error de red: dos fallos', async () => {
    const fetch = vi.fn(async () => {
      throw new Error('ECONNREFUSED');
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(r.ok).toBe(false);
    expect(r.resultados).toHaveLength(2);
    expect(r.resultados.every((x) => !x.ok)).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('timeout (AbortError) se trata como fallo de conexión', async () => {
    const fetch = crearFetch({
      api: () => {
        const e = new Error('The operation was aborted');
        e.name = 'AbortError';
        throw e;
      },
      web: webOk,
    });
    const r = await verificarEsqueleto({ fetch, urls: URLS });
    expect(porNombre(r, 'api').ok).toBe(false);
    expect(porNombre(r, 'api').detalle).toContain('pnpm dev');
  });
});

describe('formatearResultados', () => {
  it('todo ok: una línea por servicio con ✔ y resumen verde', () => {
    const texto = formatearResultados({
      ok: true,
      resultados: [
        { nombre: 'api', ok: true, detalle: 'responde 200, db up' },
        { nombre: 'web', ok: true, detalle: 'responde 200' },
      ],
    });
    const lineas = texto.trim().split('\n');
    expect(lineas).toHaveLength(3);
    expect(lineas[0]).toBe('✔ api: responde 200, db up');
    expect(lineas[1]).toBe('✔ web: responde 200');
    expect(lineas[2]).not.toMatch(/fall/i);
  });

  it('con un fallo: ✖ en el servicio y resumen con el número de fallos', () => {
    const texto = formatearResultados({
      ok: false,
      resultados: [
        { nombre: 'api', ok: true, detalle: 'bien' },
        { nombre: 'web', ok: false, detalle: 'no responde' },
      ],
    });
    const lineas = texto.trim().split('\n');
    expect(lineas).toHaveLength(3);
    expect(lineas[0]).toBe('✔ api: bien');
    expect(lineas[1]).toBe('✖ web: no responde');
    expect(lineas[2]).toMatch(/1/);
    expect(lineas[2]).toMatch(/fall/i);
  });

  it('con dos fallos: el resumen indica 2', () => {
    const texto = formatearResultados({
      ok: false,
      resultados: [
        { nombre: 'api', ok: false, detalle: 'x' },
        { nombre: 'web', ok: false, detalle: 'y' },
      ],
    });
    const lineas = texto.trim().split('\n');
    expect(lineas[0]).toBe('✖ api: x');
    expect(lineas[1]).toBe('✖ web: y');
    expect(lineas[2]).toMatch(/2/);
  });
});
