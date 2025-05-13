'use client';

import { setLocale } from '@/server/actions/locale';
import { Button, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function LangButton() {
  const t = useTranslations();

  return (
    <Menu withArrow>
      <MenuTarget>
        <Button color="gray" variant="subtle" leftSection={<IconLanguage />}>
          {t('language')}
        </Button>
      </MenuTarget>

      <MenuDropdown>
        <MenuItem leftSection="En" onClick={() => setLocale('en')}>
          English
        </MenuItem>

        <MenuItem leftSection="Ar" onClick={() => setLocale('ar')}>
          العربية
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
