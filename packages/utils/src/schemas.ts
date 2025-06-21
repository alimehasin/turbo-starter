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
  id: z.uuid(),
  key: z.string(),
});

export const iraqPhoneSchema = z.string().regex(/^\+964(77|78|79|75)\d{8}$/, {
  message: 'رقم هاتف غير صالح',
});
