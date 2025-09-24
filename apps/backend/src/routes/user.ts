import { Elysia } from 'elysia';
import { files } from '@/app/files/files.user.route';
import { governorates } from '@/app/governorates/governorates.user.route';

export const userRoutes = new Elysia({ prefix: '/user', tags: ['User'] })

  // Routes
  .use(governorates)
  .use(files);
