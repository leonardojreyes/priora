import { crearBoss } from './boss.js';
import { cargarConfig } from './config.js';
import { registrarPing } from './ping.js';

const iniciar = async (): Promise<void> => {
  const config = cargarConfig(process.env);
  const boss = crearBoss(config.databaseUrl);
  boss.on('error', (error: Error) => console.error(`pg-boss: ${error.message}`));

  await boss.start();
  await registrarPing(boss, { registrar: (linea) => console.log(linea) });
  console.log('Worker listo: cola "ping" activa');

  const cerrar = async (): Promise<void> => {
    await boss.stop({ graceful: true, timeout: 10_000 });
    process.exit(0);
  };
  process.once('SIGINT', () => void cerrar());
  process.once('SIGTERM', () => void cerrar());
};

iniciar().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
