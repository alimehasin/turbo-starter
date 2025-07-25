import { Text, type TextProps } from '@mantine/core';
import { formatPhoneNumber } from '@repo/utils/helpers';

export interface PhoneNumberProps extends TextProps {
  phone: string;
}

export function PhoneNumber({ phone, ...props }: PhoneNumberProps) {
  return (
    <Text {...props}>
      <Text c="gray.9" dir="ltr" fz="sm" span>
        {formatPhoneNumber(phone)}
      </Text>
    </Text>
  );
}
