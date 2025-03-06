import { z } from 'zod';

export const paginationSchema = z
  .object({
    page: z.number(),
    pageSize: z.number(),
  })
  .optional();

export const sortingSchema = z
  .object({
    column: z.string(),
    direction: z.enum(['asc', 'desc']),
  })
  .optional();
