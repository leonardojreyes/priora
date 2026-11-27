import type { PgBoss } from 'pg-boss';

export const PING_QUEUE = 'ping';

interface TrabajoPing {
  id: string;
  data: unknown;
}

interface OpcionesPing {
  registrar: (linea: string) => void;
}

const tenantDe = (data: unknown): string | undefined => {
  const tenant = (data as { tenant_id?: unknown } | null | undefined)?.tenant_id;
  return typeof tenant === 'string' && tenant.trim() !== '' ? tenant : undefined;
};

/** Todo trabajo lleva `tenant_id` (ADR-0008); sin él se rechaza y pg-boss lo marca como fallido. */
export const crearManejadorPing =
  ({ registrar }: OpcionesPing) =>
  async (trabajos: TrabajoPing[]): Promise<void> => {
    for (const trabajo of trabajos) {
      const tenant = tenantDe(trabajo.data);
      if (!tenant) throw new Error(`El trabajo ${trabajo.id} no trae tenant_id`);
      registrar(`ping tenant_id=${tenant} job=${trabajo.id}`);
    }
  };

/** Cola no particionada: `createQueue` solo inserta una fila, no necesita CREATE en `pgboss`. */
export const registrarPing = async (boss: PgBoss, opciones: OpcionesPing): Promise<void> => {
  await boss.createQueue(PING_QUEUE);
  await boss.work(PING_QUEUE, crearManejadorPing(opciones));
};
