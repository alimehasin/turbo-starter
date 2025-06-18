import { ActionIcon, useComputedColorScheme } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

export function EditButton({ onClick }: { onClick?: () => void }) {
  const cs = useComputedColorScheme();

  return (
    <ActionIcon
      variant="subtle"
      onClick={onClick}
      color={cs === 'light' ? 'gray.7' : 'dark.3'}
    >
      <IconPencil />
    </ActionIcon>
  );
}
