import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { generarContratos, verificarContratos } from '../lib/contratos.mjs';

const TIMEOUT = 120_000;
const temporales = [];

const crearTemporal = async () => {
  const dir = await mkdtemp(join(tmpdir(), 'priora-contratos-'));
  temporales.push(dir);
  return dir;
};

describe('contratos', () => {
  afterAll(async () => {
    await Promise.all(temporales.map((dir) => rm(dir, { recursive: true, force: true })));
  });

  it(
    'genera, es determinista y verifica la deriva',
    async () => {
      const a = await crearTemporal();
      const b = await crearTemporal();

      await generarContratos({ destino: a });
      const openapi = JSON.parse(await readFile(join(a, 'openapi.json'), 'utf8'));
      expect(openapi.openapi.startsWith('3.1')).toBe(true);
      expect(openapi.paths['/health'].get.operationId).toBe('getHealth');
      const cliente = await readFile(join(a, 'src/generated/api.ts'), 'utf8');
      expect(cliente).toContain('getHealth');

      await generarContratos({ destino: b });
      expect(await readFile(join(b, 'openapi.json'), 'utf8')).toBe(
        await readFile(join(a, 'openapi.json'), 'utf8'),
      );
      expect(await readFile(join(b, 'src/generated/api.ts'), 'utf8')).toBe(cliente);

      expect(await verificarContratos({ destino: a })).toEqual({ ok: true, diferencias: [] });

      const jsonOriginal = await readFile(join(a, 'openapi.json'), 'utf8');
      await writeFile(join(a, 'openapi.json'), '{}\n');
      const r1 = await verificarContratos({ destino: a });
      expect(r1.ok).toBe(false);
      expect(r1.diferencias).toContain('openapi.json');
      await writeFile(join(a, 'openapi.json'), jsonOriginal);

      await writeFile(join(a, 'src/generated/api.ts'), `${cliente}// alterado\n`);
      const r2 = await verificarContratos({ destino: a });
      expect(r2.ok).toBe(false);
      expect(r2.diferencias).toContain('src/generated/api.ts');

      await rm(join(a, 'openapi.json'));
      await rm(join(a, 'src/generated/api.ts'));
      const r3 = await verificarContratos({ destino: a });
      expect(r3.ok).toBe(false);
      expect(r3.diferencias).toEqual(
        expect.arrayContaining(['openapi.json', 'src/generated/api.ts']),
      );
    },
    TIMEOUT * 3,
  );

  it(
    'el contrato versionado en packages/contracts está al día',
    async () => {
      const resultado = await verificarContratos();
      expect(resultado.diferencias).toEqual([]);
      expect(resultado.ok).toBe(true);
    },
    TIMEOUT,
  );
});
