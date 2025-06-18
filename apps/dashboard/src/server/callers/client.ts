'use client';

import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/server/routers';

export const api = createTRPCReact<AppRouter>();

export type RouterOutputs = inferRouterOutputs<AppRouter>;
