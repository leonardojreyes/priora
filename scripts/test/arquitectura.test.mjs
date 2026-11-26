import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buscarReferenciasLocal, cruzarDependencias } from '../lib/arquitectura.mjs';

const raizRepo = join(import.meta.dirname, '..', '..');
const fixture = (caso) => join(import.meta.dirname, 'fixtures', 'arquitectura', caso);

describe('arquitectura del repositorio real', () => {
  it('no tiene violaciones de dependencias', async () => {
    const resultado = await cruzarDependencias(raizRepo);
    expect(resultado.ok).toBe(true);
    expect(resultado.violaciones).toEqual([]);
  }, 60_000);

  it('no referencia .local/ desde apps ni modules', async () => {
    expect(await buscarReferenciasLocal(raizRepo)).toEqual([]);
  });
});

describe('cruzarDependencias con fixtures defectuosos', () => {
  it.each([
    ['domain-nestjs', 'domain-sin-infraestructura'],
    ['domain-drizzle', 'domain-sin-infraestructura'],
    ['domain-pgboss', 'domain-sin-infraestructura'],
    ['domain-next', 'domain-sin-infraestructura'],
    ['domain-infraestructura', 'domain-sin-infraestructura'],
    ['engine-importa-app', 'workflow-engine-aislado'],
    ['engine-importa-modulo', 'workflow-engine-aislado'],
    ['modulo-infraestructura-ajena', 'modulos-solo-via-application'],
  ])('%s viola %s', async (caso, regla) => {
    const resultado = await cruzarDependencias(fixture(caso));
    expect(resultado.ok).toBe(false);
    expect(resultado.violaciones).toContain(regla);
  });
});

describe('cruzarDependencias con fixture válido', () => {
  it('permite importar el application/index de otro módulo', async () => {
    const resultado = await cruzarDependencias(fixture('modulo-application-ajena-valido'));
    expect(resultado.ok).toBe(true);
    expect(resultado.violaciones).toEqual([]);
  });
});

describe('buscarReferenciasLocal', () => {
  it('devuelve el archivo que referencia .local/', async () => {
    expect(await buscarReferenciasLocal(fixture('referencia-local'))).toEqual([
      'apps/api/src/ruta.ts',
    ]);
  });
});
