import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { validarPlantilla } from '../lib/validar-plantillas.mjs';

const raizRepo = join(import.meta.dirname, '..', '..');
const fixture = (caso) => join(import.meta.dirname, 'fixtures', 'plantillas', caso);

describe('plantillas reales', () => {
  it.each(['marco-tic-banca', 'generica-simple'])('%s es válida', async (nombre) => {
    const resultado = await validarPlantilla(join(raizRepo, 'plantillas', nombre));
    expect(resultado.errores).toEqual([]);
    expect(resultado.ok).toBe(true);
  });
});

describe('fixtures', () => {
  it('valida: sin errores', async () => {
    const resultado = await validarPlantilla(fixture('valida'));
    expect(resultado.errores).toEqual([]);
    expect(resultado.ok).toBe(true);
  });

  it.each([
    'yaml-invalido',
    'id-duplicado',
    'inicio-inexistente',
    'enlace-roto',
    'flujo-inexistente',
    'nodo-inalcanzable',
    'nodo-sin-salida',
    'decision-sin-por-defecto',
  ])('%s reporta su código', async (codigo) => {
    const resultado = await validarPlantilla(fixture(codigo));
    expect(resultado.ok).toBe(false);
    expect(resultado.errores.map((e) => e.codigo)).toContain(codigo);
    for (const error of resultado.errores) {
      expect(error.mensaje).toBeTruthy();
      expect(error.archivo).not.toContain('\\');
    }
  });

  it('carpeta inexistente: carpeta-invalida', async () => {
    const resultado = await validarPlantilla(fixture('no-existe'));
    expect(resultado.ok).toBe(false);
    expect(resultado.errores.map((e) => e.codigo)).toContain('carpeta-invalida');
  });
});
