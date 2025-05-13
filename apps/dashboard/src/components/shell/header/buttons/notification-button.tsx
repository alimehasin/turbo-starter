'use client';

import { ActionIcon } from '@mantine/core';
import { IconSpeakerphone } from '@tabler/icons-react';

export function NotificationButton() {
  return (
    <ActionIcon variant="light">
      <IconSpeakerphone />
    </ActionIcon>
  );
}
