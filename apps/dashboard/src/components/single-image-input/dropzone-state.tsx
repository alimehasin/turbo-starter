import type { MantineColor } from '@mantine/core';
import { Group, Text, ThemeIcon } from '@mantine/core';

interface DropzoneStateProps {
  color: MantineColor;
  icon: React.ReactNode;
  message: string;
}

export function DropzoneState({ color, icon, message }: DropzoneStateProps) {
  return (
    <Group justify="center" p="sm" h={150}>
      <ThemeIcon color={color} variant="transparent">
        {icon}
      </ThemeIcon>

      <Text ta="center">{message}</Text>
    </Group>
  );
}
