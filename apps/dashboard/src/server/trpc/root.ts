import { createCallerFactory, createTRPCRouter } from '@/server/trpc/trpc';
import { accounts } from '../routers/accounts';

export const appRouter = createTRPCRouter({
  accounts,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
