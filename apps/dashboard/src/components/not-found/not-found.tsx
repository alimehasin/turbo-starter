'use client';

import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import cls from './not-found.module.css';

export function NotFound() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Container py="xl" size="xs">
      <Stack align="center" gap="xl" ta="center">
        {/* Error Code with Icon */}
        <Text className={cls.errorCode}>{t('notFound.errorCode')}</Text>

        {/* Main Content */}
        <Stack gap="md">
          <Title order={1} size="h2" c="nature.8">
            {t('notFound.title')}
          </Title>

          <Text size="lg" c="dimmed">
            {t('notFound.subtitle')}
          </Text>

          <Text size="sm" c="dimmed">
            {t('notFound.description')}
          </Text>
        </Stack>

        {/* Action Buttons */}
        <Group gap="md" mt="lg">
          <Button
            leftSection={<IconHome size={16} />}
            size="md"
            href="/"
            radius="md"
            component={Link}
            variant="filled"
          >
            {t('notFound.goHome')}
          </Button>

          <Button
            size="md"
            radius="md"
            variant="outline"
            onClick={() => router.back()}
            leftSection={<IconArrowLeft size={16} />}
          >
            {t('notFound.goBack')}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
