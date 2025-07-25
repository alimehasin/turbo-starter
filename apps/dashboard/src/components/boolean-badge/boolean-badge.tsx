import { Badge, Box } from '@mantine/core';
import { useTranslations } from 'next-intl';
import cls from './styles.module.css';

interface BooleanBadgeProps {
  value: boolean;
  label?: {
    true?: string;
    false?: string;
  };
}

export function BooleanBadge({ value, label }: BooleanBadgeProps) {
  const t = useTranslations();

  const trueBadge = (
    <Badge
      color="green"
      leftSection={<Box bg="green" className={cls.indicator} />}
      variant="light"
    >
      {label?.true ?? t('common.yes')}
    </Badge>
  );

  const falseBadge = (
    <Badge
      color="red"
      leftSection={<Box bg="red" className={cls.indicator} />}
      variant="light"
    >
      {label?.false ?? t('common.no')}
    </Badge>
  );

  return value ? trueBadge : falseBadge;
}
