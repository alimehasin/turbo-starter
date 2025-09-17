import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { DayjsProvider } from "@/providers/dayjs-provider";
import { MantineProviders } from "@/providers/mantine-providers";
import { NextIntlProvider } from "@/providers/nex-intl-provider";
import { QueryClientProvider } from "@/providers/query-client-provider";

export const metadata: Metadata = {
  title: "Turborepo Starter",
  description: "Turborepo Starter with Next.js, Mantine and more",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html dir={dir} lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <NextIntlProvider>
          <QueryClientProvider>
            <DayjsProvider locale={locale}>
              <MantineProviders locale={locale} initialDirection={dir}>
                {children}
              </MantineProviders>
            </DayjsProvider>
          </QueryClientProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
