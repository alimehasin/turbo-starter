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
      variant="light"
      leftSection={<Box bg="green" className={cls.indicator} />}
    >
      {label?.true ?? t('yes')}
    </Badge>
  );

  const falseBadge = (
    <Badge
      color="red"
      variant="light"
      leftSection={<Box bg="red" className={cls.indicator} />}
    >
      {label?.false ?? t('no')}
    </Badge>
  );

  return value ? trueBadge : falseBadge;
}
