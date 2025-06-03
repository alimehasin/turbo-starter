import { bearer } from '@elysiajs/bearer';
import { prisma } from '@repo/db';
import { Elysia } from 'elysia';

export const setup = new Elysia({ name: 'setup' })

  // Decoraters
  .decorate('prisma', prisma)

  // Plugins
  .use(bearer())

  // Translation
  .derive({ as: 'scoped' }, ({ headers }) => {
    const lang = headers['accept-language']?.split(',')[0] || 'en';

    return {
      t: ({ en, ar }: { en: string; ar: string }) => {
        return lang === 'ar' ? ar : en;
      },
    };
  });
