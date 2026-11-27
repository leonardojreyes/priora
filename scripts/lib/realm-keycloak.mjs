// Realm de desarrollo de Keycloak (ADR-0020): plantilla con marcadores + secretos generados. La plantilla
// (infra/keycloak/) NO contiene secretos; el realm resuelto se escribe en .local/ (ignorado por git).
// Se trabaja sobre objetos (no sobre texto) para que ningún valor pueda romper el JSON.
// Sin usuarios hasta el paso 0.6.
import { randomBytes } from 'node:crypto';

const MARCADOR = /\{\{([A-Z0-9_]+)\}\}/g;

export const marcadoresDe = (texto) => [...new Set([...texto.matchAll(MARCADOR)].map((m) => m[1]))];

// Sustituye marcadores en todas las cadenas. Los mensajes de error nombran el marcador, nunca su valor.
export const sustituirMarcadores = (valor, valores) => {
  const usados = new Set();
  const recorrer = (x) => {
    if (typeof x === 'string') {
      return x.replace(MARCADOR, (_, nombre) => {
        if (!Object.hasOwn(valores, nombre))
          throw new Error(`Falta el valor del marcador ${nombre}`);
        usados.add(nombre);
        return valores[nombre];
      });
    }
    if (Array.isArray(x)) return x.map(recorrer);
    if (x && typeof x === 'object') {
      return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, recorrer(v)]));
    }
    return x;
  };
  const resultado = recorrer(valor);
  const sobrantes = Object.keys(valores).filter((nombre) => !usados.has(nombre));
  if (sobrantes.length > 0) {
    throw new Error(`Valores sin marcador en la plantilla: ${sobrantes.join(', ')}`);
  }
  return resultado;
};

const generarClave = () => randomBytes(18).toString('base64url');

// Completa solo lo que falta: volver a ejecutar no cambia secretos ya entregados.
export const generarSecretos = ({ existentes = {}, generar = generarClave } = {}) => {
  const previos = existentes.marcadores ?? {};
  return {
    marcadores: { OIDC_CLIENT_SECRET: previos.OIDC_CLIENT_SECRET ?? generar() },
    adminPassword: existentes.adminPassword ?? generar(),
  };
};

export const resolverRealm = ({ plantilla, valores }) => sustituirMarcadores(plantilla, valores);
