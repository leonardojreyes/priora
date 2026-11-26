import { cleanup, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import messages from '../messages/es-EC.json';
import { metadata } from '../src/app/layout';
import Inicio from '../src/app/page';
import { MODULOS } from '../src/modulos';

const PROHIBIDOS = ['Mesa de Demanda', 'VPEG', 'Medios Tecnológicos', 'Cumplimiento'];

const valores = (nodo: unknown): string[] => {
  if (typeof nodo === 'string') return [nodo];
  if (nodo && typeof nodo === 'object') return Object.values(nodo).flatMap(valores);
  return [];
};

const contieneProhibido = (texto: string): boolean =>
  PROHIBIDOS.some((p) => texto.toLowerCase().includes(p.toLowerCase()));

const renderizar = () =>
  render(
    <NextIntlClientProvider locale="es-EC" messages={messages}>
      <Inicio />
    </NextIntlClientProvider>,
  );

const modulosMensajes = messages.Inicio.modulos as unknown as Record<
  string,
  { nombre: string; descripcion: string } | string
>;

afterEach(() => {
  cleanup();
});

describe('Inicio', () => {
  it('muestra el título como heading de nivel 1', () => {
    renderizar();
    expect(screen.getByRole('heading', { level: 1, name: 'Priora' })).toBeTruthy();
  });

  it('muestra el heading de nivel 2 "Módulos"', () => {
    renderizar();
    expect(screen.getByRole('heading', { level: 2, name: 'Módulos' })).toBeTruthy();
  });

  it('muestra la descripción del producto', () => {
    renderizar();
    expect(messages.Inicio.descripcion.length).toBeGreaterThan(0);
    expect(screen.getByText(messages.Inicio.descripcion)).toBeTruthy();
  });

  it('lista un elemento por módulo con su nombre y descripción', () => {
    renderizar();
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(MODULOS.length);
    expect(MODULOS).toHaveLength(6);
    MODULOS.forEach((modulo, i) => {
      const textos = modulosMensajes[modulo.clave] as { nombre: string; descripcion: string };
      expect(within(items[i]!).getByText(textos.nombre)).toBeTruthy();
      expect(within(items[i]!).getByText(textos.descripcion)).toBeTruthy();
    });
  });

  it('no renderiza nombres de la plantilla bancaria', () => {
    const { container } = renderizar();
    expect(contieneProhibido(container.textContent ?? '')).toBe(false);
  });
});

describe('mensajes es-EC', () => {
  it('no contienen nombres de la plantilla bancaria en ningún valor', () => {
    const todos = valores(messages);
    expect(todos.length).toBeGreaterThan(0);
    expect(todos.filter(contieneProhibido)).toEqual([]);
  });

  it('cada módulo tiene nombre y descripción no vacíos', () => {
    for (const { clave } of MODULOS) {
      const textos = modulosMensajes[clave] as { nombre: string; descripcion: string };
      expect(textos, clave).toBeDefined();
      expect(textos.nombre.trim().length, `${clave}.nombre`).toBeGreaterThan(0);
      expect(textos.descripcion.trim().length, `${clave}.descripcion`).toBeGreaterThan(0);
    }
  });

  it('las claves de módulos coinciden exactamente con MODULOS', () => {
    const claves = Object.keys(modulosMensajes).filter((k) => k !== 'titulo');
    expect([...claves].sort()).toEqual(MODULOS.map((m) => m.clave).sort());
  });
});

describe('layout', () => {
  it('define el título de metadata como Priora', () => {
    expect(metadata.title).toBe('Priora');
  });
});
