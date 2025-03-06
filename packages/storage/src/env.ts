import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  server: {
    STORAGE_REGION: z.string(),
    STORAGE_ENDPOINT: z.string(),
    STORAGE_ACCESS_KEY: z.string(),
    STORAGE_SECRET_KEY: z.string(),
    STORAGE_BUCKET_NAME: z.string(),
  },
});
