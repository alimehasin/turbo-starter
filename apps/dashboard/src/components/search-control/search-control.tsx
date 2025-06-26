import {
  type BoxProps,
  type ElementProps,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import cx from 'clsx';
import { useTranslations } from 'next-intl';
import cls from './styles.module.css';

interface SearchControlProps extends BoxProps, ElementProps<'button'> {}

export function SearchControl({ className, ...others }: SearchControlProps) {
  const t = useTranslations();

  return (
    <UnstyledButton {...others} className={cx(cls.root, className)}>
      <Group gap="xs">
        <IconSearch />

        <Text fz="sm" c="dimmed" className={cls.searchText}>
          {t('common.search')}
        </Text>

        <Text fw={700} className={cls.shortcut}>
          Ctrl + K
        </Text>
      </Group>
    </UnstyledButton>
  );
}
