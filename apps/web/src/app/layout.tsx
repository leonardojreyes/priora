import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Priora',
  description: 'Gestión de la demanda de requerimientos y proyectos de TI',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-EC">
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
