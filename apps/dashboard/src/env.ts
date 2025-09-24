import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_STORAGE_BASE_URL: process.env.NEXT_PUBLIC_STORAGE_BASE_URL,
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.url(),
    NEXT_PUBLIC_STORAGE_BASE_URL: z.url(),
  },
});
