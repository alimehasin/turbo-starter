import { InputClearButton, rem, TextInput, type TextInputProps } from '@mantine/core';
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
      w={260}
      value={value}
      leftSection={<IconSearch />}
      rightSectionWidth={rem(40)}
      placeholder={placeholder || t('common.search')}
      onChange={(event) => onChange(event.target.value)}
      rightSection={value && <InputClearButton onClick={() => onChange('')} />}
      {...props}
    />
  );
}
