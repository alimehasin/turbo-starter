import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { DayjsProvider } from './_providers/dayjs-provider';
import { MantineProviders } from './_providers/mantine-providers';
import { NextIntlProvider } from './_providers/nex-intl-provider';
import { TrpcProvider } from './_providers/trpc-provider';

export const metadata: Metadata = {
  title: 'Turborepo Starter',
  description: 'Turborepo Starter with Next.js, TRPC, Mantine, and more',
  robots: 'noindex, nofollow',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html dir={dir} lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <NextIntlProvider>
          <TrpcProvider>
            <DayjsProvider locale={locale}>
              <MantineProviders locale={locale} initialDirection={dir}>
                {children}
              </MantineProviders>
            </DayjsProvider>
          </TrpcProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
