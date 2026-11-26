import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

export const DATABASE_URL = Symbol('DATABASE_URL');
const TIEMPO_MAXIMO_MS = 2000;

/** Conexión como `priora_app` (sin BYPASSRLS). Solo se usa para comprobar disponibilidad en 0.2. */
@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor(@Inject(DATABASE_URL) databaseUrl: string) {
    this.pool = new Pool({
      connectionString: databaseUrl,
      max: 5,
      connectionTimeoutMillis: TIEMPO_MAXIMO_MS,
      query_timeout: TIEMPO_MAXIMO_MS,
    });
    // Un error de un cliente inactivo no debe tumbar el proceso.
    this.pool.on('error', () => undefined);
  }

  async estaDisponible(): Promise<boolean> {
    try {
      await this.pool.query('select 1');
      return true;
    } catch {
      return false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
