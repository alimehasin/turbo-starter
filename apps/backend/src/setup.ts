import { prisma } from '@repo/db';
import Elysia from 'elysia';
import { plugins } from './plugins';

export const setup = new Elysia({ name: 'setup' })

  // Decoraters
  .decorate('prisma', prisma)

  // Plugins
  .use(plugins.berear)

  // Translation
  .derive({ as: 'scoped' }, ({ headers }) => {
    const lang = headers['accept-language']?.split(',')[0] || 'en';

    return {
      t: ({ en, ar }: { en: string; ar: string }) => {
        return lang === 'ar' ? ar : en;
      },
    };
  });
