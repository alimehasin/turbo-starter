import { Text, type TextProps } from '@mantine/core';
import { formatPhoneNumber } from '@repo/utils';
import cls from './styles.module.css';

export interface PhoneNumberProps extends TextProps {
  phone: string;
}

export function PhoneNumber({ phone, ...props }: PhoneNumberProps) {
  return (
    <Text className={cls.root} {...props}>
      {formatPhoneNumber(phone)}
    </Text>
  );
}
