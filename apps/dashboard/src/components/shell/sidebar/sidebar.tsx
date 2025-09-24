import { Stack, Text } from '@mantine/core';
import { IconBuilding, IconHome } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ShellLink } from './shell-link';

export function Sidebar() {
  const t = useTranslations();

  const links = [
    {
      label: '',
      links: [
        {
          icon: IconHome,
          label: t('sidebar.home'),
          path: '/',
          activeExact: true,
        },
      ],
    },
    {
      label: '',
      links: [
        {
          icon: IconBuilding,
          label: t('sidebar.governorates'),
          path: '/governorates',
        },
      ],
    },
  ];

  return (
    <Stack p="md">
      {links.map((link, i) => (
        <div key={i.toString()}>
          <Text fz={12} c="gray">
            {link.label}
          </Text>

          <Stack gap={2}>
            {link.links.map((link) => (
              <ShellLink key={link.path} {...link} />
            ))}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}
