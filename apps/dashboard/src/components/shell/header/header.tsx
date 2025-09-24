'use client';

import { ActionIcon, Burger, Button, Container, Group } from '@mantine/core';
import {
  IconInfoCircle,
  IconSearch,
  IconSettings,
  IconSpeakerphone,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ActionIconsContainer } from '@/components/action-icons-container';

export function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const t = useTranslations();

  return (
    <Container h="100%" size="xl">
      <Group h="100%" justify="space-between">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>

        <Group gap="sm">
          <Button visibleFrom="sm" h={44} leftSection={<IconSearch />}>
            {t('_.search')}
          </Button>

          <ActionIconsContainer>
            <ActionIcon color="gray" size={36} variant="subtle" bdrs="xl">
              <IconSpeakerphone />
            </ActionIcon>

            <ActionIcon color="gray" size={36} variant="subtle" bdrs="xl">
              <IconUser />
            </ActionIcon>

            <ActionIcon color="gray" size={36} variant="subtle" bdrs="xl">
              <IconSettings />
            </ActionIcon>
          </ActionIconsContainer>

          <ActionIconsContainer>
            <ActionIcon color="gray" size={36} variant="subtle" bdrs="xl">
              <IconInfoCircle />
            </ActionIcon>
          </ActionIconsContainer>
        </Group>
      </Group>
    </Container>
  );
}
