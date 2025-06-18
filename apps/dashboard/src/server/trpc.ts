import { initTRPC, TRPCError } from '@trpc/server';
import { getLocale } from 'next-intl/server';
import superjson from 'superjson';
import { authenticate, getToken } from './actions/auth';

const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;

const i18nMiddleware = t.middleware(async ({ next, ctx }) => {
  const locale = await getLocale();

  const t = ({ en, ar }: { en: string; ar: string }) => {
    return locale === 'ar' ? ar : en;
  };

  return next({
    ctx: { ...ctx, locale, t },
  });
});

export const publicProcedure = t.procedure.use(i18nMiddleware);

export const privateProcedure = publicProcedure.use(async ({ next, ctx }) => {
  const token = await getToken();
  const admin = await authenticate(token);

  if (!admin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: ctx.t({
        en: 'Please login',
        ar: 'يرجى تسجيل الدخول',
      }),
    });
  }

  return next({
    ctx: { ...ctx, adminId: admin.id },
  });
});
