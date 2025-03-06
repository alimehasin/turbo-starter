import { SearchControl } from '@/components/search-control';
import { Spotlight as MantineSpotlight, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function Spotlight() {
  const t = useTranslations();

  return (
    <>
      <SearchControl w={400} onClick={() => spotlight.open()} />

      <MantineSpotlight
        actions={[]}
        highlightQuery
        nothingFound={t('nothingFound')}
        searchProps={{
          placeholder: t('search'),
          leftSection: <IconSearch size={20} stroke={1.5} />,
        }}
      />
    </>
  );
}
