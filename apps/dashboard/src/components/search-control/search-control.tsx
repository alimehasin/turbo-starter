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

        <Text c="dimmed" className={cls.searchText} fz="sm">
          {t('common.search')}
        </Text>

        <Text className={cls.shortcut} fw={700}>
          Ctrl + K
        </Text>
      </Group>
    </UnstyledButton>
  );
}
