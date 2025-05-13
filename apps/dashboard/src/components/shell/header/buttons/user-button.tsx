'use client';

import { setToken } from '@/server/actions/auth';
import { ActionIcon, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core';
import { useNotifications } from '@repo/hooks';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function UserButton() {
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  const logoutMut = useMutation({
    mutationFn: () => setToken(''),
    onSuccess: () => {
      router.push('/accounts/login');
      n.success(t('logoutSuccess'));
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
          {t('logout')}
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
