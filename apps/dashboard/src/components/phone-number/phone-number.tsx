import { Text, type TextProps } from '@mantine/core';
import { formatPhoneNumber } from '@repo/utils/helpers';

export interface PhoneNumberProps extends TextProps {
  phone: string;
}

export function PhoneNumber({ phone, ...props }: PhoneNumberProps) {
  return (
    <Text {...props}>
      <Text span dir="ltr" c="gray.9" fz="sm">
        {formatPhoneNumber(phone)}
      </Text>
    </Text>
  );
}
