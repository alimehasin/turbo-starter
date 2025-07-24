'use client';

import { Button, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { formatPhoneNumberWA } from '@repo/utils/helpers';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PhoneNumber } from '../phone-number';
import cls from './styles.module.css';

export function PhoneButton({ phone }: { phone: string }) {
  const t = useTranslations();

  return (
    <Tooltip
      openDelay={1000}
      withArrow
      label={
        <Group gap="xs">
          <ThemeIcon color="nature" variant="transparent" size="lg">
            <IconBrandWhatsapp />
          </ThemeIcon>

          <Text>{t('common.clickToCallWhatsApp')}</Text>
        </Group>
      }
    >
      <Button
        color="dark"
        component="a"
        target="_blank"
        variant="subtle"
        size="compact-md"
        className={cls.button}
        href={`https://wa.me/${formatPhoneNumberWA(phone)}`}
      >
        <PhoneNumber fz={16} phone={phone} />
      </Button>
    </Tooltip>
  );
}
