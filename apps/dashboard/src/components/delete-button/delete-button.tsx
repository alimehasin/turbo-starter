import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionIcon color="red.6" onClick={onClick} variant="subtle">
      <IconTrash />
    </ActionIcon>
  );
}
