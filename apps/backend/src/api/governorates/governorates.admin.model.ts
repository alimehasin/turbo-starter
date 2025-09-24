import { t } from 'elysia';
import { GovernoratePlain } from '@/generated/prismabox/Governorate';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

export const GovernorateAdminModel = {
  // List
  AdminGovernorateListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
  }),
  AdminGovernorateListResponse: t.Object({
    total: t.Number(),
    data: t.Array(GovernoratePlain),
  }),

  // Create
  AdminGovernorateCreateBody: t.Object({
    name: t.String(),
  }),
  AdminGovernorateCreateResponse: GovernoratePlain,

  // Update
  AdminGovernorateUpdateParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  AdminGovernorateUpdateBody: t.Object({
    name: t.String(),
  }),
  AdminGovernorateUpdateResponse: GovernoratePlain,

  // Delete
  AdminGovernorateDeleteParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  AdminGovernorateDeleteResponse: t.Any(),
};
