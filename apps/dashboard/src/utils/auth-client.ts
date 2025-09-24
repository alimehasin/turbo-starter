import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { env } from '@/env';

export const authClient = createAuthClient({
  basePath: '/auth',
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,

  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        gender: {
          type: 'string',
          enum: ['Male', 'Female'],
        },

        avatarId: {
          type: 'string',
          required: false,
        },
      },
    }),
  ],
});
