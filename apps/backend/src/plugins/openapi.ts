import { openapi as elysiaOpenapi } from '@elysiajs/openapi';
import { fromTypes } from '@elysiajs/openapi/gen';
import { Elysia } from 'elysia';
import { env } from '@/env';

export const openapi =
  env.NODE_ENV !== 'development'
    ? new Elysia({})
    : elysiaOpenapi({
        references: fromTypes('src/server.ts'),
        path: '/docs',
        documentation: {
          tags: [],
          components: {
            securitySchemes: {
              'Bearer Auth': {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
        },
      });
