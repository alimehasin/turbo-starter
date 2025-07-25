'use client';

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
import {
  IconKey,
  IconLanguage,
  IconLogin,
  IconUser,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { setToken } from '@/server/actions/auth';
import { setLocale } from '@/server/actions/locale';
import { api } from '@/server/callers/client';

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
        bg="var(--mantine-primary-color-filled)"
        h="100vh"
        visibleFrom="md"
        w="100%"
      />

      <Center h="100vh">
        <Stack p="sm">
          <Title c="nature.7">{t('common.loginTitle')}</Title>

          <Paper p="sm" withBorder>
            <FocusTrap>
              <form onSubmit={handleSubmit}>
                <Stack w={{ base: '100%', md: 500 }}>
                  <TextInput
                    autoCapitalize="off"
                    label={t('common.username')}
                    leftSection={<IconUser />}
                    required
                    {...form.getInputProps('username')}
                  />

                  <PasswordInput
                    label={t('common.password')}
                    leftSection={<IconKey />}
                    required
                    {...form.getInputProps('password')}
                  />

                  <Button
                    leftSection={<IconLogin />}
                    loading={loginMut.isPending}
                    type="submit"
                  >
                    {t('common.login')}
                  </Button>
                </Stack>
              </form>
            </FocusTrap>
          </Paper>

          <div>
            <Menu>
              <Menu.Target>
                <Button
                  color="gray"
                  leftSection={<IconLanguage />}
                  variant="subtle"
                >
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
