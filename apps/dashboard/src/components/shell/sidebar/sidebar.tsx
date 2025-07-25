'use client';

import { Stack } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ShellLink } from './shell-link';

export function Sidebar({ toggle }: { toggle: () => void }) {
  const t = useTranslations();

  return (
    <Stack gap={4} h="100%" p="xs">
      <ShellLink
        activeExact
        icon={<IconHome size={18} />}
        label={t('sidebar.home')}
        section="/"
        toggle={toggle}
      />
    </Stack>
  );
}
