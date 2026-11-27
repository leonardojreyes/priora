import { useTranslations } from 'next-intl';
import { MODULOS } from '../modulos';

export default function Inicio() {
  const t = useTranslations('Inicio');

  return (
    <main>
      <h1>{t('titulo')}</h1>
      <p>{t('descripcion')}</p>
      <h2>{t('modulos.titulo')}</h2>
      <ul>
        {MODULOS.map(({ clave }) => (
          <li key={clave}>
            <strong>{t(`modulos.${clave}.nombre`)}</strong>
            <p>{t(`modulos.${clave}.descripcion`)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
