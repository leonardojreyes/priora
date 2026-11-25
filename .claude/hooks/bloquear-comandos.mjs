// PreToolUse (Bash): bloquea comandos destructivos o contra producción.
import { leerEntrada, bloquear, permitir } from './_comun.mjs';

const comando = String(leerEntrada()?.tool_input?.command ?? '');
if (!comando) permitir();

// Carpetas que sí se pueden borrar sin pedir permiso (artefactos regenerables)
const borrablesSeguras = /^(\.\/)?((apps|packages|modules)\/[\w.-]+\/)?(node_modules|dist|build|coverage|\.turbo|\.next|playwright-report|test-results)\/?$/;

function rmPeligroso(cmd) {
  const coincidencias = cmd.matchAll(/\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f?|-[a-zA-Z]*f[a-zA-Z]*r)[a-zA-Z]*\s+([^;&|]+)/g);
  for (const m of coincidencias) {
    const objetivos = m[2].trim().split(/\s+/);
    if (objetivos.some((o) => !borrablesSeguras.test(o))) return true;
  }
  return false;
}

const reglas = [
  { si: rmPeligroso, motivo: 'rm recursivo fuera de carpetas de artefactos (node_modules, dist, .turbo, .next, coverage). Pide confirmación al responsable.' },
  { si: (c) => /\b(Remove-Item|rmdir|del)\b.*(-Recurse|\/s)/i.test(c), motivo: 'Borrado recursivo en Windows. Pide confirmación al responsable.' },
  { si: (c) => /\bgit\s+push\b.*(--force|-f\b|--force-with-lease)/.test(c), motivo: 'git push forzado no está permitido.' },
  { si: (c) => /\bgit\s+push\b.*\b(main|master)\b/.test(c), motivo: 'No se empuja directo a main: abre un PR.' },
  { si: (c) => /\bgit\s+(reset\s+--hard|clean\s+-[a-z]*f)/.test(c), motivo: 'Comando git destructivo. Pide confirmación al responsable.' },
  { si: (c) => /--no-verify\b/.test(c), motivo: 'No se saltan los hooks de git (--no-verify).' },
  { si: (c) => /\bdocker\s+(compose\s+down\s+.*-v|volume\s+(rm|prune)|system\s+prune)/.test(c), motivo: 'Borraría volúmenes de datos. Pide confirmación al responsable.' },
  { si: (c) => /\b(drop\s+(database|schema|table)|truncate\s+table)\b/i.test(c), motivo: 'SQL destructivo. Usa una migración revisada o pide confirmación.' },
  { si: (c) => /\b(kubectl|helm\s+(upgrade|install|uninstall)|tofu\s+(apply|destroy)|terraform)\b/.test(c), motivo: 'Comandos de infraestructura requieren aprobación del responsable.' },
  { si: (c) => /(curl|wget)[^|]*\|\s*(sh|bash|zsh|pwsh)/.test(c), motivo: 'No se ejecutan scripts descargados de internet.' },
  { si: (c) => /\b(prod|produccion|production)\b/i.test(c) && /(DATABASE_URL|psql|pg_dump|ssh|scp)/.test(c), motivo: 'Acceso a producción no permitido desde Claude.' },
  { si: (c) => /\bsudo\b/.test(c), motivo: 'sudo no está permitido.' },
];

for (const regla of reglas) {
  if (regla.si(comando)) bloquear(`Bloqueado por bloquear-comandos: ${regla.motivo}\nComando: ${comando}`);
}
permitir();
