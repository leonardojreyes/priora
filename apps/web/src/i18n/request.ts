import { getRequestConfig } from 'next-intl/server';

// Un solo idioma por ahora: español de Ecuador.
export default getRequestConfig(async () => ({
  locale: 'es-EC',
  messages: (await import('../../messages/es-EC.json')).default,
}));
