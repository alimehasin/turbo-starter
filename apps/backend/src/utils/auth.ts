import { prisma } from '@db/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, openAPI, phoneNumber } from 'better-auth/plugins';
import { env } from '@/env';

export const auth = betterAuth({
  basePath: '/',
  trustedOrigins: env.BETTER_AUTH_TRUSTED_ORIGINS,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  advanced: {
    database: { generateId: false },
  },

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin({}),

    openAPI({
      disableDefaultReference: true,
    }),

    phoneNumber({
      sendOTP: async ({ code, phoneNumber }) => {
        console.log(code);
        console.log(phoneNumber);
      },

      signUpOnVerification: {
        getTempName: (phoneNumber) => `User ${phoneNumber}`,
        getTempEmail: (phoneNumber) => `${phoneNumber}@phone-auth.local`,
      },
    }),
  ],
});
