import { Badge } from '@mantine/core';
import { formatDate, formatDateTime } from '@repo/utils';

export function DateTimeBadge({ date }: { date: Date }) {
  return <Badge variant="default">{formatDateTime(date)}</Badge>;
}

export function DateBadge({ date }: { date: Date }) {
  return <Badge variant="default">{formatDate(date)}</Badge>;
}
