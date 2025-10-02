'use client';

import { List, ListItem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const n = useNotifications();

  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        mutations: {
          onError: async (err) => {
            if (err instanceof HTTPError) {
              const errorBody = await err.response.json();
              if (errorBody.errorCode === 'ValidationError') {
                showNotification({
                  color: 'red',
                  title: t('_.error'),
                  message: (
                    <List>
                      {errorBody.errors.map((error: string) => (
                        <ListItem key={error}>{error}</ListItem>
                      ))}
                    </List>
                  ),
                });
              } else {
                n.error(errorBody.message);
              }
            }
          },
        },
      },
    });
  });

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
