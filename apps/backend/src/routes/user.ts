import { Elysia } from 'elysia';
import { files } from '@/api/files/files.user.route';
import { governorates } from '@/api/governorates/governorates.user.route';

export const userRoutes = new Elysia({ prefix: '/user', tags: ['User'] })

  // Routes
  .use(governorates)
  .use(files);
