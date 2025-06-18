import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionIcon color="red.6" variant="subtle" onClick={onClick}>
      <IconTrash />
    </ActionIcon>
  );
}
