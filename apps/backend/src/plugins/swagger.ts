import { swagger as elysiaSwagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { env } from '@/env';

export const swagger =
  env.NODE_ENV !== 'development'
    ? new Elysia({})
    : elysiaSwagger({
        path: '/docs',
        autoDarkMode: true,
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
