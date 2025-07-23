import { createFormActions } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import superjson from 'superjson';
import { ZodError, z } from 'zod';

export const createQueryClient = () => {
  const formActions = createFormActions('trpc-form');

  return new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (e) => {
          if (e instanceof TRPCClientError) {
            if (e.data.code !== 'BAD_REQUEST') {
              return;
            }

            if (e instanceof ZodError) {
              formActions.setErrors(z.treeifyError(e));
            }

            if (e.message) {
              showNotification({
                color: 'red',
                message: e.message,
              });
            }
          }
        },
      },

      queries: {
        staleTime: 30 * 1000,
      },

      hydrate: {
        deserializeData: superjson.deserialize,
      },

      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
};
