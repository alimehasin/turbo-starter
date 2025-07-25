import {
  InputClearButton,
  rem,
  TextInput,
  type TextInputProps,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface SearchInputProps extends Omit<TextInputProps, 'onChange'> {
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  ...props
}: SearchInputProps) {
  const t = useTranslations();

  return (
    <TextInput
      leftSection={<IconSearch />}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder || t('common.search')}
      rightSection={value && <InputClearButton onClick={() => onChange('')} />}
      rightSectionWidth={rem(40)}
      w={260}
      {...props}
    />
  );
}
