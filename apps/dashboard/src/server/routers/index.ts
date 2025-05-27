import { router } from '@/server/trpc';
import { accounts } from './accounts';

export const appRouter = router({
  accounts,
});

export type AppRouter = typeof appRouter;
