'use client';

import { setToken } from '@/server/actions/auth';
import { setLocale } from '@/server/actions/locale';
import { api } from '@/server/trpc/react';
import {
  Box,
  Button,
  Center,
  FocusTrap,
  Menu,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconKey, IconLanguage, IconLogin, IconUser } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Login({ locale }: { locale: string }) {
  const router = useRouter();
  const t = useTranslations();

  const form = useForm({
    name: 'trpc-form',
    initialValues: {
      username: '',
      password: '',
    },
  });

  const setLocaleMut = useMutation({
    mutationFn: setLocale,
    onSuccess: router.refresh,
  });

  const loginMut = api.accounts.login.useMutation({
    onSuccess: async (v) => {
      await setToken(v);
      router.push('/');
    },
  });

  const handleSubmit = form.onSubmit(({ username, password }) => {
    loginMut.mutate({ username, password });
  });

  return (
    <SimpleGrid cols={{ md: 2 }} spacing={0}>
      <Box
        w="100%"
        h="100vh"
        visibleFrom="md"
        bg="var(--mantine-primary-color-filled)"
      />

      <Center h="100vh">
        <Stack p="sm">
          <Title c="nature.7">{t('loginTitle')}</Title>

          <Paper withBorder p="sm">
            <FocusTrap>
              <form onSubmit={handleSubmit}>
                <Stack w={{ base: '100%', md: 500 }}>
                  <TextInput
                    required
                    autoCapitalize="off"
                    label={t('username')}
                    leftSection={<IconUser />}
                    {...form.getInputProps('username')}
                  />

                  <PasswordInput
                    required
                    label={t('password')}
                    leftSection={<IconKey />}
                    {...form.getInputProps('password')}
                  />

                  <Button
                    type="submit"
                    leftSection={<IconLogin />}
                    loading={loginMut.isPending}
                  >
                    {t('login')}
                  </Button>
                </Stack>
              </form>
            </FocusTrap>
          </Paper>

          <div>
            <Menu>
              <Menu.Target>
                <Button color="gray" variant="subtle" leftSection={<IconLanguage />}>
                  {locale === 'ar' ? 'العربية' : 'English'}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => setLocaleMut.mutate('ar')}>
                  العربية
                </Menu.Item>
                <Menu.Item onClick={() => setLocaleMut.mutate('en')}>
                  English
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </Stack>
      </Center>
    </SimpleGrid>
  );
}
