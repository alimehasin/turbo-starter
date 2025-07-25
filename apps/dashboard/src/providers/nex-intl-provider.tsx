import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export async function NextIntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
