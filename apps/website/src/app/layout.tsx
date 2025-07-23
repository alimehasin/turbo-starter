import '@/styles/globals.css';

import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Toaster } from '@/components/ui/sonner';
import { DayjsProvider } from '@/providers/dayjs-provider';
import { DirectionProvider } from '@/providers/direction-provider';
import { NextIntlProvider } from '@/providers/nex-intl-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { TrpcProvider } from '@/providers/trpc-provider';

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
            <DirectionProvider dir={dir}>
              <DayjsProvider locale={locale}>
                <ThemeProvider>
                  <main className="flex-1">{children}</main>

                  <Toaster />
                </ThemeProvider>
              </DayjsProvider>
            </DirectionProvider>
          </NextIntlProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
