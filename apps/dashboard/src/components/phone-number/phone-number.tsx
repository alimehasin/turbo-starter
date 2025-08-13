import { Text, type TextProps } from '@mantine/core';
import { formatPhoneNumber } from '@repo/utils/helpers';
import cls from './styles.module.css';

export interface PhoneNumberProps extends TextProps {
  phone: string;
}

export function PhoneNumber({ phone, ...props }: PhoneNumberProps) {
  return (
    <Text {...props}>
      <Text span className={cls.root}>
        {formatPhoneNumber(phone)}
      </Text>
    </Text>
  );
}
