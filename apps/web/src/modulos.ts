// Módulos de producto visibles en la página de inicio. Los textos viven en messages/es-EC.json.
export const MODULOS = [
  { clave: 'entrada' },
  { clave: 'clasificacion' },
  { clave: 'priorizacion' },
  { clave: 'decisiones' },
  { clave: 'ejecucion' },
  { clave: 'indicadores' },
] as const;

export type ClaveModulo = (typeof MODULOS)[number]['clave'];
