'use client';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';
import '@/styles/globals.css';

import { DirectionProvider, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/styles/theme';

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
