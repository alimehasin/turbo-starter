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
    <Card p="sm" shadow="xs" withBorder>
      <Group justify="space-between" mb={5}>
        <Text c="gray" fw={700} size="xs">
          {title}
        </Text>

        {icon && (
          <ThemeIcon color={color} variant="transparent">
            {icon}
          </ThemeIcon>
        )}
      </Group>

      <Text fw={700} size="xl">
        {value.toLocaleString()}
      </Text>

      {description && (
        <Text c="gray" mt={4} size="sm">
          {description}
        </Text>
      )}
    </Card>
  );
}
