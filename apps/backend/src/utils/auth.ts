import { prisma } from "@db/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, openAPI, phoneNumber } from "better-auth/plugins";

export const auth = betterAuth({
  basePath: "/",

  // TODO: Specify the trusted origins in the env file
  trustedOrigins: ["http://localhost:3001"],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
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
