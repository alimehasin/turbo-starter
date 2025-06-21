import '@/styles/globals.css';

import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Toaster } from '@/components/ui/sonner';
import { DayjsProvider } from './_providers/dayjs-provider';
import { NextIntlProvider } from './_providers/nex-intl-provider';
import { ThemeProvider } from './_providers/theme-provider';
import { TrpcProvider } from './_providers/trpc-provider';

export const metadata: Metadata = {
  title: 'Turbo Starter | Website',
  description: 'Turbo Starter | Website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html dir={dir} lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <TrpcProvider>
          <NextIntlProvider>
            <DayjsProvider locale={locale}>
              <ThemeProvider>
                <main className="flex-1">{children}</main>

                <Toaster />
              </ThemeProvider>
            </DayjsProvider>
          </NextIntlProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
