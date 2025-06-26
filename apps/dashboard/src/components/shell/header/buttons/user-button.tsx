'use client';

import { ActionIcon, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useNotifications } from '@/hooks/use-notifications';
import { setToken } from '@/server/actions/auth';

export function UserButton() {
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  const logoutMut = useMutation({
    mutationFn: () => setToken(''),
    onSuccess: () => {
      router.push('/accounts/login');
      n.success(t('common.logoutSuccess'));
    },
  });

  return (
    <Menu withArrow>
      <MenuTarget>
        <ActionIcon color="gray" variant="subtle" size={36}>
          <IconUser />
        </ActionIcon>
      </MenuTarget>

      <MenuDropdown miw={160}>
        <MenuItem
          color="red"
          leftSection={<IconLogout size={18} />}
          onClick={() => logoutMut.mutate()}
        >
          {t('common.logout')}
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
