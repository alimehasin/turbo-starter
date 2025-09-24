import { Elysia } from 'elysia';
import type { TranslationFn } from '@/types';
import { SetupModel } from './model';

export const setup = new Elysia({ name: 'setup' })
  .model(SetupModel)

  .macro({
    successStatus: (statusCode: number) => ({
      afterHandle({ set }) {
        set.status = statusCode;
      },
    }),
  })

  .derive({ as: 'scoped' }, ({ headers }) => {
    const lang = headers['accept-language']?.split(',')[0] || 'en';

    const t: TranslationFn = ({ en, ar }: { en: string; ar: string }) => {
      return lang === 'ar' ? ar : en;
    };

    return { t };
  });
