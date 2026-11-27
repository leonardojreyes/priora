import { describe, expect, it } from 'vitest';
import {
  evaluarPrevios,
  parsearPs,
  parsearTasklist,
  pasosBootstrap,
  procesosDev,
  resumirRam,
} from '../lib/orquestacion.mjs';

describe('pasosBootstrap', () => {
  const ids = (p) => p.map((x) => x.id);

  it('con Keycloak instalado omite keycloak-install y conserva el orden', () => {
    const pasos = pasosBootstrap({ keycloakInstalado: true, realmGenerado: true });
    expect(ids(pasos)).toEqual([
      'db-init',
      'db-migrate',
      'db-migrate-prueba',
      'db-seed',
      'keycloak-realm',
    ]);
  });

  it('sin Keycloak instalado incluye keycloak-install antes del realm', () => {
    const pasos = pasosBootstrap({ keycloakInstalado: false, realmGenerado: false });
    expect(ids(pasos)).toEqual([
      'db-init',
      'db-migrate',
      'db-migrate-prueba',
      'db-seed',
      'keycloak-install',
      'keycloak-realm',
    ]);
  });

  it('el realm se genera siempre, con cualquier combinación', () => {
    for (const keycloakInstalado of [true, false]) {
      for (const realmGenerado of [true, false]) {
        expect(ids(pasosBootstrap({ keycloakInstalado, realmGenerado }))).toContain(
          'keycloak-realm',
        );
      }
    }
  });

  it('usa los comandos y argumentos esperados', () => {
    const pasos = pasosBootstrap({ keycloakInstalado: false, realmGenerado: false });
    const por = Object.fromEntries(pasos.map((p) => [p.id, p]));
    expect(por['db-init'].args).toEqual(['scripts/db-init.mjs']);
    expect(por['db-migrate'].args).toEqual(['scripts/db-migrate.mjs']);
    expect(por['db-migrate-prueba'].args).toEqual(['scripts/db-migrate.mjs', '--prueba']);
    expect(por['db-seed'].args).toEqual(['scripts/db-seed.mjs']);
    expect(por['keycloak-install'].args).toEqual(['scripts/keycloak-dev.mjs', 'install', '--si']);
    expect(por['keycloak-realm'].args).toEqual(['scripts/keycloak-realm.mjs']);
  });

  it('todos los pasos usan node, tienen título y nunca bash ni pnpm', () => {
    const pasos = pasosBootstrap({ keycloakInstalado: false, realmGenerado: false });
    for (const p of pasos) {
      expect(p.comando).toBe('node');
      expect(typeof p.titulo).toBe('string');
      expect(p.titulo.length).toBeGreaterThan(0);
      expect(['bash', 'sh', 'pnpm']).not.toContain(p.comando);
      expect(p.args).not.toContain('pnpm');
    }
  });
});

describe('procesosDev', () => {
  it('define la compilación previa de api y worker', () => {
    expect(procesosDev({ plataforma: 'darwin' }).compilar).toEqual({
      comando: 'pnpm',
      args: ['--filter', '@priora/api', '--filter', '@priora/worker', 'build'],
    });
  });

  it('define api, worker y web con pnpm', () => {
    const { procesos } = procesosDev({ plataforma: 'linux' });
    expect(procesos).toHaveLength(3);
    const por = Object.fromEntries(procesos.map((p) => [p.nombre, p]));
    expect(Object.keys(por).sort()).toEqual(['api', 'web', 'worker']);
    expect(por.api.args).toEqual(['--filter', '@priora/api', 'start']);
    expect(por.worker.args).toEqual(['--filter', '@priora/worker', 'start']);
    expect(por.web.args).toEqual(['--filter', '@priora/web', 'dev']);
    for (const p of procesos) expect(p.comando).toBe('pnpm');
  });

  it('shell solo es true en win32', () => {
    for (const p of procesosDev({ plataforma: 'win32' }).procesos) expect(p.shell).toBe(true);
    for (const plataforma of ['darwin', 'linux']) {
      for (const p of procesosDev({ plataforma }).procesos) expect(p.shell).toBe(false);
    }
  });
});

describe('evaluarPrevios', () => {
  it('todo listo: sin errores ni avisos', () => {
    expect(evaluarPrevios({ postgresListo: true, keycloakListo: true })).toEqual({
      errores: [],
      avisos: [],
    });
  });

  it('PostgreSQL caído es un error que menciona bootstrap o db:init', () => {
    const r = evaluarPrevios({ postgresListo: false, keycloakListo: true });
    expect(r.errores).toHaveLength(1);
    expect(r.errores[0]).toMatch(/pnpm bootstrap|db:init/);
    expect(r.avisos).toEqual([]);
  });

  it('Keycloak caído es solo un aviso que menciona pnpm keycloak:start', () => {
    const r = evaluarPrevios({ postgresListo: true, keycloakListo: false });
    expect(r.errores).toEqual([]);
    expect(r.avisos).toHaveLength(1);
    expect(r.avisos[0]).toMatch(/pnpm keycloak:start/);
  });

  it('ambos caídos: un error y un aviso', () => {
    const r = evaluarPrevios({ postgresListo: false, keycloakListo: false });
    expect(r.errores).toHaveLength(1);
    expect(r.avisos).toHaveLength(1);
  });
});

describe('parsearPs', () => {
  it('convierte rss en KiB a MB y toma el basename del comando', () => {
    const texto = ['  204800 /usr/local/bin/node', ' 1048576 /opt/java/bin/java'].join('\n');
    expect(parsearPs(texto)).toEqual([
      { nombre: 'node', mb: 200 },
      { nombre: 'java', mb: 1024 },
    ]);
  });

  it('texto vacío devuelve arreglo vacío', () => {
    expect(parsearPs('')).toEqual([]);
    expect(parsearPs('\n  \n')).toEqual([]);
  });

  it('ignora líneas mal formadas', () => {
    const texto = ['basura', 'abc /bin/node', '2048', '', '  2048 postgres'].join('\n');
    expect(parsearPs(texto)).toEqual([{ nombre: 'postgres', mb: 2 }]);
  });

  it('soporta CRLF', () => {
    expect(parsearPs('1024 /bin/node\r\n')).toEqual([{ nombre: 'node', mb: 1 }]);
  });
});

describe('parsearTasklist', () => {
  it('lee memoria con separador de miles en punto', () => {
    const texto = '"node.exe","1234","Console","1","204.800 KB"';
    expect(parsearTasklist(texto)).toEqual([{ nombre: 'node.exe', mb: 200 }]);
  });

  it('lee memoria con separador de miles en coma y sufijo K', () => {
    const texto = '"java.exe","99","Console","1","1,048,576 K"';
    expect(parsearTasklist(texto)).toEqual([{ nombre: 'java.exe', mb: 1024 }]);
  });

  it('procesa varias líneas con CRLF', () => {
    const texto = [
      '"postgres.exe","10","Services","0","10.240 KB"',
      '"node.exe","11","Console","1","2,048 K"',
    ].join('\r\n');
    expect(parsearTasklist(texto)).toEqual([
      { nombre: 'postgres.exe', mb: 10 },
      { nombre: 'node.exe', mb: 2 },
    ]);
  });

  it('vacío y líneas corruptas se ignoran', () => {
    expect(parsearTasklist('')).toEqual([]);
    const texto = ['no es csv', '"solo","dos"', '"x.exe","1","a","0","sin memoria"'].join('\n');
    expect(parsearTasklist(texto)).toEqual([]);
  });
});

describe('resumirRam', () => {
  it('lista vacía da grupos en cero', () => {
    expect(resumirRam([])).toEqual({
      grupos: { node: 0, java: 0, postgres: 0, otros: 0 },
      totalMb: 0,
    });
  });

  it('agrupa por nombre sin distinguir mayúsculas ni .exe', () => {
    const r = resumirRam([
      { nombre: 'node', mb: 100 },
      { nombre: 'Node.EXE', mb: 50 },
      { nombre: 'java', mb: 400 },
      { nombre: 'JAVA.exe', mb: 100 },
      { nombre: 'postgres', mb: 30 },
      { nombre: 'postgres.exe', mb: 20 },
      { nombre: 'zsh', mb: 5 },
    ]);
    expect(r.grupos).toEqual({ node: 150, java: 500, postgres: 50, otros: 5 });
    expect(r.totalMb).toBe(705);
  });

  it('redondea a entero', () => {
    const r = resumirRam([
      { nombre: 'node', mb: 10.4 },
      { nombre: 'node', mb: 10.4 },
      { nombre: 'otro', mb: 0.6 },
    ]);
    expect(Number.isInteger(r.grupos.node)).toBe(true);
    expect(r.grupos.node).toBe(21);
    expect(r.grupos.otros).toBe(1);
    expect(Number.isInteger(r.totalMb)).toBe(true);
  });

  it('se integra con parsearPs', () => {
    const r = resumirRam(parsearPs('  1024 /bin/node\n  2048 /usr/bin/java\n   512 /bin/zsh'));
    expect(r.grupos).toEqual({ node: 1, java: 2, postgres: 0, otros: 1 });
    expect(r.totalMb).toBe(4);
  });
});
