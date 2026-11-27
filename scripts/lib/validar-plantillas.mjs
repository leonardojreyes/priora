import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import yaml from 'js-yaml';

const aRuta = (ruta) => ruta.split(/[\\/]/).join('/');

const yamls = (carpeta) =>
  readdirSync(carpeta, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith('.yaml'))
    .map((e) => join(e.parentPath, e.name))
    .sort();

/** Destinos de nodo (cadenas) referenciados por cualquier clave `a` dentro de un nodo. */
const destinosDe = (valor, destinos = []) => {
  if (Array.isArray(valor)) valor.forEach((v) => destinosDe(v, destinos));
  else if (valor && typeof valor === 'object') {
    for (const [clave, v] of Object.entries(valor)) {
      if (clave === 'a' && typeof v === 'string') destinos.push(v);
      else destinosDe(v, destinos);
    }
  }
  return destinos;
};

const aristasDe = (nodo) => {
  const destinos = destinosDe({ ...nodo, espera: undefined });
  if (typeof nodo.por_defecto === 'string') destinos.push(nodo.por_defecto);
  return destinos;
};

const validarFlujo = (flujo, archivo, clavesFlujos, errores) => {
  const error = (codigo, mensaje) => errores.push({ codigo, archivo, mensaje });
  const nodos = Array.isArray(flujo.nodos) ? flujo.nodos : [];
  const ids = new Set();
  for (const nodo of nodos) {
    if (ids.has(nodo.id)) error('id-duplicado', `Nodo duplicado: ${nodo.id}`);
    ids.add(nodo.id);
  }
  if (!ids.has(flujo.inicio)) error('inicio-inexistente', `El inicio "${flujo.inicio}" no existe`);

  const grafo = new Map();
  for (const nodo of nodos) {
    const destinos = aristasDe(nodo);
    grafo.set(nodo.id, destinos);
    const verifica = (destino, donde) => {
      if (!ids.has(destino)) {
        error('enlace-roto', `Nodo ${nodo.id}: ${donde} apunta a "${destino}", que no existe`);
      }
    };
    destinos.forEach((d) => verifica(d, 'salida'));
    (Array.isArray(nodo.espera) ? nodo.espera : []).forEach((d) => verifica(d, 'espera'));
    if (nodo.tipo === 'decision' && !nodo.por_defecto) {
      error('decision-sin-por-defecto', `La decisión ${nodo.id} no tiene por_defecto`);
    }
    if (!['fin', 'traspaso'].includes(nodo.tipo) && destinos.length === 0) {
      error('nodo-sin-salida', `El nodo ${nodo.id} no tiene salida`);
    }
    if (['subflujo', 'traspaso'].includes(nodo.tipo) && !clavesFlujos.has(nodo.flujo)) {
      error('flujo-inexistente', `Nodo ${nodo.id}: el flujo "${nodo.flujo}" no existe`);
    }
  }

  const alcanzados = new Set();
  const pendientes = ids.has(flujo.inicio) ? [flujo.inicio] : [];
  while (pendientes.length > 0) {
    const id = pendientes.pop();
    if (alcanzados.has(id)) continue;
    alcanzados.add(id);
    pendientes.push(...(grafo.get(id) ?? []).filter((d) => ids.has(d)));
  }
  for (const id of ids) {
    if (!alcanzados.has(id)) error('nodo-inalcanzable', `El nodo ${id} es inalcanzable`);
  }
};

/** Valida sintaxis YAML y la estructura de los flujos de una plantilla de empresa. */
export const validarPlantilla = async (carpeta) => {
  const errores = [];
  if (
    !existsSync(carpeta) ||
    !statSync(carpeta).isDirectory() ||
    !existsSync(join(carpeta, 'plantilla.yaml'))
  ) {
    return {
      ok: false,
      errores: [
        { codigo: 'carpeta-invalida', archivo: '', mensaje: `No es una plantilla: ${carpeta}` },
      ],
    };
  }

  const flujos = [];
  for (const ruta of yamls(carpeta)) {
    const archivo = aRuta(relative(carpeta, ruta));
    let documento;
    try {
      documento = yaml.load(readFileSync(ruta, 'utf8'));
    } catch (causa) {
      errores.push({ codigo: 'yaml-invalido', archivo, mensaje: causa.message });
      continue;
    }
    if (archivo.startsWith('flujos/') && documento && typeof documento === 'object') {
      flujos.push({ archivo, flujo: documento });
    }
  }

  const claves = new Set(flujos.map(({ flujo }) => flujo.clave));
  for (const { archivo, flujo } of flujos) validarFlujo(flujo, archivo, claves, errores);
  return { ok: errores.length === 0, errores };
};
