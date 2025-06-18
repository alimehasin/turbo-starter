import { z } from 'zod/v4';

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export const sortingSchema = z.object({
  column: z.string(),
  direction: z.enum(['asc', 'desc']),
});

export const fileSchema = z.object({
  id: z.string().uuid(),
  key: z.string(),
});
