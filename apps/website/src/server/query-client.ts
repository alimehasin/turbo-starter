import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { toast } from 'sonner';
import superjson from 'superjson';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (e) => {
          if (e instanceof TRPCClientError) {
            if (e.data.code !== 'BAD_REQUEST') {
              return;
            }

            if (e.data?.zodError?.fieldErrors) {
              // TODO: handle zod errors
            } else if (e.message) {
              toast.error(e.message);
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
