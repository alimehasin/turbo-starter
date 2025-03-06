import { env } from '@/env';
import { bearer as elysiaBearer } from '@elysiajs/bearer';
import { cors as elysiaCors } from '@elysiajs/cors';
import { swagger as elysiaSwagger } from '@elysiajs/swagger';
import Elysia from 'elysia';
import { crons } from './crons';
import { logger } from './logger';

const berear = elysiaBearer();

const swagger =
  env.NODE_ENV !== 'development'
    ? new Elysia({})
    : elysiaSwagger({
        path: '/docs',
        autoDarkMode: true,
        documentation: { tags: [] },
      });

const cors = elysiaCors({
  allowedHeaders: '*',
  credentials: true,
});

export const plugins = {
  cors,
  berear,
  logger,
  swagger,
  crons,
};
