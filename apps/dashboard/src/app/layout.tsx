import { TRPCReactProvider } from '@/server/trpc/react';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { roboto } from '@repo/theme/fonts/roboto';
import { rubik } from '@repo/theme/fonts/rubik';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ClientProviders } from './client-providers';

export const metadata: Metadata = {
  title: 'Turborepo Starter',
  description: 'Turborepo Starter with Next.js, TRPC, Mantine, and more',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      dir={dir}
      lang={locale}
      {...mantineHtmlProps}
      className={`${rubik.className} ${roboto.className}`}
    >
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <ClientProviders locale={locale} initialDirection={dir}>
              {children}
            </ClientProviders>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
