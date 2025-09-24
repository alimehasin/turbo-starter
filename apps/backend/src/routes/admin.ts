import { Elysia } from 'elysia';
import { files } from '@/api/files/files.admin.route';
import { governorates } from '@/api/governorates/governorates.admin.route';
import { betterAuth } from '@/plugins/better-auth';

export const adminRoutes = new Elysia({ prefix: '/admin', tags: ['Admin'] })
  // Plugins
  .use(betterAuth)
  .guard({ mustBeAdmin: true })

  // Routes
  .use(governorates)
  .use(files);
