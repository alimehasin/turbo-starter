import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,

  server: {
    // Base
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Better Auth
    BETTER_AUTH_TRUSTED_ORIGINS: z
      .string()
      .transform((str) => str.split(",").map((s) => s.trim())),

    // Storage
    STORAGE_REGION: z.string(),
    STORAGE_ENDPOINT: z.string(),
    STORAGE_ACCESS_KEY: z.string(),
    STORAGE_SECRET_KEY: z.string(),
    STORAGE_BUCKET_NAME: z.string(),
  },
});
