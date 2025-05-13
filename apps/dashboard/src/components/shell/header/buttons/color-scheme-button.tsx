'use client';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeButton() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ActionIcon color="gray" variant="subtle" onClick={toggleColorScheme} size={36}>
      {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
}
