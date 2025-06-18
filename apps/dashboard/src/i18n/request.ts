import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const res = cookieStore.get('locale');

  const locale = res?.value ?? 'en';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
