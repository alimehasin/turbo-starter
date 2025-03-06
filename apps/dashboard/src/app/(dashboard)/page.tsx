import { Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div>
      <Title>{t('title')}</Title>
    </div>
  );
}
