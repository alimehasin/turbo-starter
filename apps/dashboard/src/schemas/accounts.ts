import { z } from 'zod/v4';

export const accountsSchemas = {
  login: z.object({
    username: z.string(),
    password: z.string(),
  }),
};
