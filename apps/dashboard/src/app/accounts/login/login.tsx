'use client';

import {
  Box,
  Button,
  Center,
  FocusTrap,
  Group,
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
import { useNotifications } from '@/hooks/use-notifications';
import { authClient } from '@/lib/auth-client';
import { setLocale } from '@/server/actions/locale';
import type { LoginRequestBody } from '@/types/server';

export default function Login({ locale }: { locale: string }) {
  const router = useRouter();
  const t = useTranslations();
  const n = useNotifications();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const setLocaleMut = useMutation({
    mutationFn: setLocale,
    onSuccess: router.refresh,
  });

  const signInMut = useMutation({
    mutationFn: async ({ email, password }: LoginRequestBody) => {
      const result = await authClient.signIn.email({ email, password });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.data;
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: Error) => {
      n.error(error.message);
    },
  });

  const handleSubmit = form.onSubmit(({ email, password }) => {
    signInMut.mutate({ email, password });
  });

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
      <Box
        w="100%"
        visibleFrom="md"
        h={{ base: 'auto', md: '100vh' }}
        mih={{ base: '200px', md: '100vh' }}
        bg="var(--mantine-primary-color-1)"
      >
        <Center h="100%" p="xl">
          <Title>{t('login.logo')}</Title>
        </Center>
      </Box>

      <Center
        h={{ base: '100vh', md: '100vh' }}
        p={{ base: 'md', sm: 'lg', md: 'xl' }}
      >
        <Stack w="100%" maw={{ base: '100%', sm: 400, md: 500 }} gap="md">
          <Title c="nature.7" order={1} size="h1" ta="center">
            {t('login.loginTitle')}
          </Title>

          <Paper
            withBorder
            radius="md"
            shadow="sm"
            p={{ base: 'md', sm: 'lg' }}
          >
            <FocusTrap>
              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  <TextInput
                    required
                    autoCapitalize="off"
                    label={t('login.email')}
                    leftSection={<IconUser size={18} />}
                    {...form.getInputProps('email')}
                  />

                  <PasswordInput
                    required
                    label={t('login.password')}
                    leftSection={<IconKey size={18} />}
                    {...form.getInputProps('password')}
                  />

                  <Button
                    mt="sm"
                    fullWidth
                    type="submit"
                    loading={signInMut.isPending}
                    leftSection={<IconLogin size={18} />}
                  >
                    {t('login.login')}
                  </Button>
                </Stack>
              </form>
            </FocusTrap>
          </Paper>

          {/* Language selector */}
          <Group>
            <Menu>
              <Menu.Target>
                <Button
                  color="gray"
                  variant="subtle"
                  size="compact-sm"
                  leftSection={<IconLanguage size={18} />}
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
          </Group>
        </Stack>
      </Center>
    </SimpleGrid>
  );
}
