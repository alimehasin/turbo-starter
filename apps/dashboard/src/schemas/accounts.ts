import { z } from 'zod';

export const accountsSchemas = {
  login: z.object({
    username: z.string(),
    password: z.string(),
  }),
};
