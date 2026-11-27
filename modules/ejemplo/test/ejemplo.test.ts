import { describe, expect, it } from 'vitest';
import { Ejemplo } from '../domain/ejemplo.js';
import * as application from '../application/index.js';

describe('Ejemplo', () => {
  it('crea una entidad válida', () => {
    const e = Ejemplo.create({ id: 'e-1', tenantId: 't-1', name: 'Demo' });
    expect(e.id).toBe('e-1');
    expect(e.tenantId).toBe('t-1');
    expect(e.name).toBe('Demo');
  });

  it('recorta los espacios del nombre', () => {
    const e = Ejemplo.create({ id: 'e-1', tenantId: 't-1', name: '  Demo  ' });
    expect(e.name).toBe('Demo');
  });

  it('rechaza un nombre en blanco', () => {
    expect(() => Ejemplo.create({ id: 'e-1', tenantId: 't-1', name: '   ' })).toThrow(Error);
  });

  it('rechaza un tenantId vacío', () => {
    expect(() => Ejemplo.create({ id: 'e-1', tenantId: '', name: 'Demo' })).toThrow(Error);
  });

  it('application re-exporta Ejemplo', () => {
    expect(application.Ejemplo).toBe(Ejemplo);
  });
});
