'use client';

import { setToken } from '@/server/actions/auth';
import { setLocale } from '@/server/actions/locale';
import { SIDEBAR_WIDTH } from '@/utils/constants';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Center,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { useNotifications } from '@repo/hooks';
import {
  IconLanguage,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Spotlight } from './spotlight';
import cls from './styles.module.css';

export function Logo() {
  return (
    <Center h="100%">
      <Title order={3}>Ali Mehasin</Title>
    </Center>
  );
}

export function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const logoutMut = useMutation({
    mutationFn: () => setToken(''),
    onSuccess: () => {
      router.push('/accounts/login');
      n.success(t('logoutSuccess'));
    },
  });

  return (
    <>
      <Group h="100%" hiddenFrom="md">
        <Burger mx="md" size="sm" opened={opened} onClick={toggle} />
        <Logo />
      </Group>

      <Group h="100%" justify="space-between" visibleFrom="md">
        <Box h="100%" w={SIDEBAR_WIDTH} className={cls.logo}>
          <Logo />
        </Box>

        <Group justify="space-between" style={{ flexGrow: 1 }}>
          <Spotlight />

          <Group gap="xs" mx="xl">
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

            <ActionIcon
              color="gray"
              variant="subtle"
              onClick={toggleColorScheme}
              size={36}
            >
              {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
            </ActionIcon>

            <Menu withArrow>
              <MenuTarget>
                <Button variant="subtle" color="gray" leftSection={<IconLanguage />}>
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
          </Group>
        </Group>
      </Group>
    </>
  );
}
