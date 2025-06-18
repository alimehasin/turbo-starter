import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
    AUTH_TOKEN_EXPIRATION: process.env.AUTH_TOKEN_EXPIRATION,
    NEXT_PUBLIC_STORAGE_BASE_URL: process.env.NEXT_PUBLIC_STORAGE_BASE_URL,
  },

  server: {
    JWT_SECRET_KEY: z.string(),
    STORAGE_BUCKET_NAME: z.string(),
    AUTH_TOKEN_EXPIRATION: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  client: {
    NEXT_PUBLIC_STORAGE_BASE_URL: z.string().url(),
  },
});
