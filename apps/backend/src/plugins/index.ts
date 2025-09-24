import { Elysia } from 'elysia';
import { betterAuth } from './better-auth';
import { cors } from './cors';
import { crons } from './crons';
import { errorHandler } from './error-handler';
import { helmet } from './helmet';
import { logger } from './logger';
import { openapi } from './openapi';
import { rateLimit } from './rate-limit';

export const plugins = new Elysia({ name: 'plugins' })
  .use(cors)
  .use(crons)
  .use(helmet)
  .use(logger)
  .use(openapi)
  .use(rateLimit)
  .use(betterAuth)
  .use(errorHandler);
