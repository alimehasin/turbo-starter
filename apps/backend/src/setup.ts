import { prisma } from '@repo/db';
import Elysia from 'elysia';
import { plugins } from './plugins';

export const setup = new Elysia({ name: 'setup' })

  // Decoraters
  .decorate('prisma', prisma)

  // Plugins
  .use(plugins.berear);
