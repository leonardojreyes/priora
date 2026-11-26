import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Funciona desde src/ y desde dist/: ambos están a dos niveles de package.json.
const paquete = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8')) as {
  version: string;
};

export const version: string = paquete.version;
