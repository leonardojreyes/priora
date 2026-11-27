import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const leer = (ruta) => readFileSync(join(raiz, ruta), 'utf8');

const documentos = [
  'README.md',
  'ARCHITECTURE.md',
  'FASE0.md',
  'docs/fase0/base-tecnica.md',
  'docs/fase0/guia-de-ejecucion.md',
  'docs/fase0/estado.md',
];

// Enlaces markdown relativos `[texto](ruta)`; se ignoran URL, anclas y correos.
const enlacesRelativos = (texto) =>
  [...texto.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)]
    .map((m) => m[1].split('#')[0])
    .filter((ruta) => ruta && !/^([a-z]+:|\/\/)/i.test(ruta));

describe('documentación del paso 0.2', () => {
  it.each(documentos)('%s existe y sus enlaces relativos resuelven', (doc) => {
    expect(existsSync(join(raiz, doc)), `${doc} no existe`).toBe(true);
    const rotos = enlacesRelativos(leer(doc)).filter(
      (ruta) => !existsSync(resolve(raiz, dirname(doc), ruta)),
    );
    expect(rotos).toEqual([]);
  });

  it('la guía de ejecución documenta los comandos del esqueleto', () => {
    const guia = leer('docs/fase0/guia-de-ejecucion.md');
    for (const cmd of [
      'pnpm bootstrap',
      'pnpm dev',
      'pnpm verificar:esqueleto',
      'pnpm keycloak:start',
      'pnpm db:migrate',
      'pnpm ram-report',
    ]) {
      expect(guia, cmd).toContain(cmd);
    }
  });

  it('el README no pide Docker como requisito', () => {
    expect(leer('README.md')).not.toMatch(/Docker Desktop/i);
  });

  it('ARCHITECTURE.md no lista Mailpit ni infra/compose para desarrollo', () => {
    const arq = leer('ARCHITECTURE.md');
    expect(arq).not.toContain('infra/{keycloak,compose}');
    expect(arq).not.toMatch(/\|\s*Mailpit/);
  });

  it('FASE0.md §0.2 registra la desviación por ADR-0020', () => {
    const fase = leer('FASE0.md');
    const seccion = fase.slice(fase.indexOf('### 0.2 '), fase.indexOf('### 0.3 '));
    expect(seccion).toContain('ADR-0020');
  });

  it('base-tecnica.md P10 no menciona Compose como práctica de desarrollo', () => {
    const base = leer('docs/fase0/base-tecnica.md');
    const p10 = base.split('\n').find((l) => l.startsWith('| P10'));
    expect(p10).not.toMatch(/Compose,/);
  });
});

describe('.claude/settings.json', () => {
  const ajustes = JSON.parse(leer('.claude/settings.json'));
  const { allow, ask, deny } = ajustes.permissions;

  it('no deja permisos de docker compose', () => {
    for (const lista of [allow, ask, deny]) {
      expect(lista.filter((p) => p.includes('docker compose'))).toEqual([]);
    }
  });

  it('permite pnpm db:* y pnpm keycloak:* sin pedir confirmación, salvo db:reset', () => {
    expect(allow).toContain('Bash(pnpm db:*)');
    expect(allow).toContain('Bash(pnpm keycloak:*)');
    expect(ask).toContain('Bash(pnpm db:reset:*)');
  });
});
