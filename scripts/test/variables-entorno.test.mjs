import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const raiz = join(import.meta.dirname, '..', '..');
const leer = (ruta) => readFileSync(join(raiz, ruta), 'utf8');

// Variables de .env.example: líneas CLAVE=valor (ignora comentarios y vacías).
const variablesEjemplo = () =>
  Object.fromEntries(
    leer('.env.example')
      .split('\n')
      .filter((l) => /^[A-Z][A-Z0-9_]*=/.test(l))
      .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]),
  );

// Variables documentadas: primera columna de las tablas, entre comillas invertidas.
const variablesDocumentadas = () =>
  leer('docs/fase0/variables-de-entorno.md')
    .split('\n')
    .map((l) => /^\|\s*`([A-Z][A-Z0-9_]*)`\s*\|/.exec(l)?.[1])
    .filter(Boolean);

describe('variables de entorno', () => {
  it('toda variable de .env.example está documentada y viceversa', () => {
    const ejemplo = Object.keys(variablesEjemplo()).sort();
    const documentadas = [...variablesDocumentadas()].sort();
    expect(documentadas).toEqual(ejemplo);
  });

  it('no hay variables documentadas repetidas', () => {
    const documentadas = variablesDocumentadas();
    expect(new Set(documentadas).size).toBe(documentadas.length);
  });

  it('las variables sensibles van vacías en .env.example', () => {
    const sensibles = Object.entries(variablesEjemplo()).filter(([k]) =>
      /(PASSWORD|SECRET|TOKEN|PRIVATE|SEALING)/.test(k),
    );
    for (const [clave, valor] of sensibles) expect(valor, clave).toBe('');
  });

  it('las URLs de base de datos no traen contraseña incrustada', () => {
    for (const [clave, valor] of Object.entries(variablesEjemplo())) {
      if (clave.startsWith('DATABASE_URL')) expect(valor, clave).not.toMatch(/:\/\/[^:/]+:[^@]+@/);
    }
  });

  it('las variables documentadas incluyen las que exige ADR-0020', () => {
    const documentadas = variablesDocumentadas();
    for (const v of [
      'DATABASE_URL_APP',
      'DATABASE_URL_MIGRATOR',
      'DATABASE_URL_TEST',
      'OIDC_ISSUER_URL',
      'KEYCLOAK_PORT',
      'API_PORT',
      'WEB_PORT',
    ])
      expect(documentadas).toContain(v);
  });
});
