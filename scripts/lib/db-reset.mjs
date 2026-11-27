// Lógica de `pnpm db:reset`: elimina las bases del proyecto (los roles y sus claves se conservan).
// Solo actúa sobre bases con el prefijo del proyecto; ante cualquier otra, falla sin ejecutar nada.

export const resetear = async ({ admin, config }) => {
  const bases = Object.values(config.bases);
  const ajena = bases.find((base) => !base.startsWith(config.prefijo));
  if (ajena) throw new Error(`Se niega a eliminar "${ajena}": no empieza por "${config.prefijo}"`);
  for (const base of bases) {
    await admin.query(`DROP DATABASE IF EXISTS ${admin.escapeIdentifier(base)} WITH (FORCE)`);
  }
};
