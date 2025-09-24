'use client';

import { ActionIcon, Group, Stack, Tooltip } from '@mantine/core';
import {
  IconInfoCircle,
  IconSettings,
  IconSpeakerphone,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export function QuickActions() {
  const t = useTranslations();

  return (
    <Stack gap="xs" my="sm">
      <Group justify="center" gap="xs">
        <Tooltip label={t('sidebar.announcements')} position="top">
          <ActionIcon color="blue" variant="light" radius="md">
            <IconSpeakerphone size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('sidebar.profile')} position="top">
          <ActionIcon color="green" variant="light" radius="md">
            <IconUser size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('sidebar.settings')} position="top">
          <ActionIcon color="orange" variant="light" radius="md">
            <IconSettings size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('sidebar.helpInfo')} position="top">
          <ActionIcon color="purple" variant="light" radius="md">
            <IconInfoCircle size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Stack>
  );
}
