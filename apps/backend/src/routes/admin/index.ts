import { Elysia } from 'elysia';
import { betterAuth } from '@/plugins/better-auth';
import { governorates } from './governorates';

export const admin = new Elysia({ prefix: '/admin', tags: ['Admin'] })

  // Plugins
  .use(betterAuth)
  .guard({ mustBeAdmin: true })

  // Routes
  .use(governorates);
