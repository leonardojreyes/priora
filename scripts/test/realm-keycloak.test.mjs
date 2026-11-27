import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  generarSecretos,
  marcadoresDe,
  resolverRealm,
  sustituirMarcadores,
} from '../lib/realm-keycloak.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const plantillaTexto = readFileSync(
  join(raiz, 'infra', 'keycloak', 'realm-priora.plantilla.json'),
  'utf8',
);
const plantilla = JSON.parse(plantillaTexto);

let n = 0;
const generarFijo = () => `clave-${(n += 1).toString().padStart(4, '0')}-xxxxxxxxxxxxxxxxxxxxxxxx`;
const secretos = generarSecretos({ existentes: {}, generar: generarFijo });
const resolver = (cambios = {}) =>
  resolverRealm({
    plantilla,
    valores: {
      WEB_ORIGIN: 'http://localhost:3000',
      ...secretos.marcadores,
      ...cambios,
    },
  });
const cliente = (realm, id) => realm.clients.find((c) => c.clientId === id);

describe('la plantilla no contiene secretos', () => {
  it('todo secreto o contraseña es un marcador {{…}}', () => {
    const hallazgos = [];
    const recorrer = (valor, ruta) => {
      if (Array.isArray(valor)) valor.forEach((v, i) => recorrer(v, `${ruta}[${i}]`));
      else if (valor && typeof valor === 'object')
        for (const [k, v] of Object.entries(valor)) recorrer(v, `${ruta}.${k}`);
      else if (
        typeof valor === 'string' &&
        /^(secret|password|value)$/i.test(ruta.split('.').pop()) &&
        !/^\{\{[A-Z0-9_]+\}\}$/.test(valor)
      )
        hallazgos.push(ruta);
    };
    recorrer(plantilla, 'plantilla');
    expect(hallazgos).toEqual([]);
  });

  it('no trae ninguna cadena larga parecida a una clave (≥ 32 caracteres sin espacios)', () => {
    const largas = (plantillaTexto.match(/"[A-Za-z0-9+/_=-]{32,}"/g) ?? []).filter(
      (c) => !/^"([A-Z_]+|[a-z-]+)"$/.test(c),
    );
    expect(largas).toEqual([]);
  });

  it('sus marcadores son exactamente OIDC_CLIENT_SECRET y WEB_ORIGIN', () => {
    expect([...marcadoresDe(plantillaTexto)].sort()).toEqual(['OIDC_CLIENT_SECRET', 'WEB_ORIGIN']);
  });
});

describe('plantilla de Priora', () => {
  it('es el realm priora y no define usuarios (llegan en el paso 0.6)', () => {
    expect(plantilla.realm).toBe('priora');
    expect(plantilla.users).toEqual([]);
  });

  it('no contiene términos de la plantilla bancaria ni del proyecto hermano', () => {
    for (const termino of ['Mesa de Demanda', 'VPEG', 'Medios Tecnológicos', 'sigiso']) {
      expect(plantillaTexto, termino).not.toContain(termino);
    }
  });
});

describe('sustituirMarcadores', () => {
  it('reemplaza dentro de cadenas, anidados y arreglos sin tocar lo demás', () => {
    expect(
      sustituirMarcadores({ a: ['{{X}}/ruta', 1, true], b: { c: 'sin' } }, { X: 'http://h' }),
    ).toEqual({
      a: ['http://h/ruta', 1, true],
      b: { c: 'sin' },
    });
  });
  it('falla si falta un valor, nombrando el marcador', () => {
    expect(() => sustituirMarcadores({ a: '{{X}}' }, {})).toThrow(/Falta el valor del marcador X/);
  });
  it('falla si sobra un valor que ningún marcador usa, sin repetir su valor', () => {
    expect(() => sustituirMarcadores({ a: 'x' }, { SOBRA: 'valor-reservado-1234' })).toThrow(
      /SOBRA/,
    );
    try {
      sustituirMarcadores({ a: 'x' }, { SOBRA: 'valor-reservado-1234' });
    } catch (error) {
      expect(error.message).not.toContain('valor-reservado-1234');
    }
  });
  it('un valor con comillas o llaves no rompe la estructura', () => {
    const realm = resolver({ OIDC_CLIENT_SECRET: 'a"b\\c{{d}}' });
    expect(cliente(realm, 'priora-web').secret).toBe('a"b\\c{{d}}');
  });
});

describe('generarSecretos', () => {
  it('genera el secreto OIDC y la clave del administrador, distintos entre sí', () => {
    expect(Object.keys(secretos.marcadores)).toEqual(['OIDC_CLIENT_SECRET']);
    expect(secretos.marcadores.OIDC_CLIENT_SECRET).toBeTruthy();
    expect(secretos.adminPassword).toBeTruthy();
    expect(secretos.adminPassword).not.toBe(secretos.marcadores.OIDC_CLIENT_SECRET);
    expect(secretos).not.toHaveProperty('usuarios');
  });
  it('conserva los existentes y solo completa lo que falta (idempotente)', () => {
    const otra = generarSecretos({ existentes: secretos, generar: () => 'nuevo' });
    expect(otra.marcadores.OIDC_CLIENT_SECRET).toBe(secretos.marcadores.OIDC_CLIENT_SECRET);
    expect(otra.adminPassword).toBe(secretos.adminPassword);
  });
  it('completa lo que falta cuando solo había una parte', () => {
    const previo = 'ya-existente';
    const otra = generarSecretos({
      existentes: { marcadores: { OIDC_CLIENT_SECRET: previo } },
      generar: () => 'nuevo',
    });
    expect(otra.marcadores.OIDC_CLIENT_SECRET).toBe(previo);
    expect(otra.adminPassword).toBe('nuevo');
  });
});

describe('realm resuelto', () => {
  const realm = resolver();

  it('no deja marcadores sin resolver', () => {
    expect(JSON.stringify(realm)).not.toMatch(/\{\{[A-Z0-9_]+\}\}/);
  });

  it('pone el secreto generado en el cliente priora-web', () => {
    expect(cliente(realm, 'priora-web').secret).toBe(secretos.marcadores.OIDC_CLIENT_SECRET);
  });

  it('no añade usuarios ni componentes', () => {
    expect(realm.users).toEqual([]);
    expect(realm.components).toBeUndefined();
  });

  it('exige TLS externo y no permite registro de usuarios', () => {
    expect(realm.sslRequired).toBe('external');
    expect(realm.registrationAllowed).toBe(false);
  });

  it('el cliente web es confidencial, sin flujos inseguros y con PKCE S256', () => {
    const web = cliente(realm, 'priora-web');
    expect(web).toMatchObject({
      publicClient: false,
      directAccessGrantsEnabled: false,
      implicitFlowEnabled: false,
    });
    expect(web.attributes['pkce.code.challenge.method']).toBe('S256');
  });

  it('las URI de redirección usan el origen indicado y no llevan comodines', () => {
    const web = cliente(realm, 'priora-web');
    expect(JSON.stringify(web.redirectUris)).toContain('http://localhost:3000');
    expect(JSON.stringify([web.redirectUris, web.webOrigins])).not.toContain('*');
  });
});
