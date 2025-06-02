'use client';

import '@/styles/globals.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/charts/styles.layer.css';
import '@mantine/dropzone/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

import { theme } from '@/styles/theme';
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

export function MantineProviders({
  locale,
  initialDirection,
  children,
}: {
  locale: string;
  initialDirection: 'ltr' | 'rtl';
  children: React.ReactNode;
}) {
  return (
    <DirectionProvider initialDirection={initialDirection}>
      <MantineProvider theme={theme}>
        <DatesProvider settings={{ locale }}>
          <ModalsProvider>
            {children}

            <Notifications />
          </ModalsProvider>
        </DatesProvider>
      </MantineProvider>
    </DirectionProvider>
  );
}
