import { Spotlight as MantineSpotlight, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { SearchControl } from '@/components/search-control';

export function Spotlight() {
  const t = useTranslations();

  return (
    <>
      <SearchControl onClick={() => spotlight.open()} w={400} />

      <MantineSpotlight
        actions={[]}
        highlightQuery
        nothingFound={t('common.nothingFound')}
        searchProps={{
          placeholder: t('common.search'),
          leftSection: <IconSearch size={20} stroke={1.5} />,
        }}
      />
    </>
  );
}
