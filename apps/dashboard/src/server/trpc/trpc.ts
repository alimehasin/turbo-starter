import { prisma } from '@repo/db';
import { TRPCError, initTRPC } from '@trpc/server';
import { getLocale } from 'next-intl/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { authenticate, getToken } from '../actions/auth';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return { prisma, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const i18nMiddleware = t.middleware(async ({ next, ctx }) => {
  const locale = await getLocale();

  const t = ({ en, ar }: { en: string; ar: string }) => {
    return locale === 'ar' ? ar : en;
  };

  return next({
    ctx: { ...ctx, locale, t },
  });
});

export const publicProcedure = t.procedure.use(timingMiddleware).use(i18nMiddleware);

export const privateProcedure = publicProcedure.use(async ({ next, ctx }) => {
  const token = await getToken();
  const admin = await authenticate(token);

  if (!admin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'يرجى تسجيل الدخول',
    });
  }

  return next({
    ctx: { ...ctx, adminId: admin.id },
  });
});
