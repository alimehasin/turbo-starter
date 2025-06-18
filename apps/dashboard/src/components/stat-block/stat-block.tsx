import { Card, Group, type MantineColor, Text, ThemeIcon } from '@mantine/core';
import type { ReactNode } from 'react';

interface StatBlockProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: ReactNode;
  color: MantineColor;
}

export function StatBlock({
  title,
  value,
  description,
  icon,
  color,
}: StatBlockProps) {
  return (
    <Card withBorder p="sm" shadow="xs">
      <Group justify="space-between" mb={5}>
        <Text size="xs" c="gray" fw={700}>
          {title}
        </Text>

        {icon && (
          <ThemeIcon color={color} variant="transparent">
            {icon}
          </ThemeIcon>
        )}
      </Group>

      <Text size="xl" fw={700}>
        {value.toLocaleString()}
      </Text>

      {description && (
        <Text size="sm" c="gray" mt={4}>
          {description}
        </Text>
      )}
    </Card>
  );
}
