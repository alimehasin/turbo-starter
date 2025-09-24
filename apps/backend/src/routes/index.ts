import { Elysia } from 'elysia';
import { adminRoutes } from './admin';
import { userRoutes } from './user';

export const routes = new Elysia()

  // Routes
  .use(adminRoutes)
  .use(userRoutes);
