// Lógica de `pnpm verificar:esqueleto`: consulta /health de la API y la página de la web. `fetch` se inyecta.
const TOPE_MS = 3000;
const HOST = '127.0.0.1';

export const urlsPorDefecto = (env) => ({
  api: `http://${HOST}:${env.API_PORT ?? 3001}/health`,
  web: `http://${HOST}:${env.WEB_PORT ?? 3000}/`,
});

const sinConexion = (nombre, url, error) => ({
  nombre,
  ok: false,
  detalle: `${nombre} no responde en ${url} (${error?.message ?? error}). ¿Está corriendo pnpm dev?`,
});

const comprobarApi = async (respuesta) => {
  if (respuesta.status !== 200 && respuesta.status !== 503) {
    return { nombre: 'api', ok: false, detalle: `/health respondió ${respuesta.status}` };
  }
  let cuerpo;
  try {
    cuerpo = await respuesta.json();
  } catch {
    return {
      nombre: 'api',
      ok: false,
      detalle: `/health respondió ${respuesta.status} con un JSON inválido`,
    };
  }
  if (cuerpo?.db !== 'up') {
    return {
      nombre: 'api',
      ok: false,
      detalle: `la API responde (${respuesta.status}) pero PostgreSQL no está disponible (db: ${cuerpo?.db ?? 'desconocido'})`,
    };
  }
  if (respuesta.status !== 200 || cuerpo.status !== 'ok') {
    return {
      nombre: 'api',
      ok: false,
      detalle: `/health respondió ${respuesta.status} con status "${cuerpo.status}"`,
    };
  }
  return { nombre: 'api', ok: true, detalle: 'responde 200, db up' };
};

const comprobarWeb = (respuesta) =>
  respuesta.status === 200
    ? { nombre: 'web', ok: true, detalle: 'responde 200' }
    : { nombre: 'web', ok: false, detalle: `la página respondió ${respuesta.status}` };

const comprobar = async (nombre, url, fetch, evaluar) => {
  let respuesta;
  try {
    respuesta = await fetch(url, { signal: AbortSignal.timeout(TOPE_MS) });
  } catch (error) {
    return sinConexion(nombre, url, error);
  }
  return evaluar(respuesta);
};

export const verificarEsqueleto = async ({ fetch, urls }) => {
  const resultados = await Promise.all([
    comprobar('api', urls.api, fetch, comprobarApi),
    comprobar('web', urls.web, fetch, comprobarWeb),
  ]);
  return { ok: resultados.every((r) => r.ok), resultados };
};

export const formatearResultados = ({ resultados }) => {
  const fallos = resultados.filter((r) => !r.ok).length;
  const lineas = resultados.map((r) => `${r.ok ? '✔' : '✖'} ${r.nombre}: ${r.detalle}`);
  lineas.push(
    fallos === 0
      ? '✔ Esqueleto verificado.'
      : `✖ ${fallos} ${fallos === 1 ? 'comprobación falló' : 'comprobaciones fallaron'}.`,
  );
  return lineas.join('\n');
};
