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
      label={
        <Group gap="xs">
          <ThemeIcon color="nature" size="lg" variant="transparent">
            <IconBrandWhatsapp />
          </ThemeIcon>

          <Text>{t('common.clickToCallWhatsApp')}</Text>
        </Group>
      }
      openDelay={1000}
      withArrow
    >
      <Button
        className={cls.button}
        color="dark"
        component="a"
        href={`https://wa.me/${formatPhoneNumberWA(phone)}`}
        size="compact-md"
        target="_blank"
        variant="subtle"
      >
        <PhoneNumber fz={16} phone={phone} />
      </Button>
    </Tooltip>
  );
}
