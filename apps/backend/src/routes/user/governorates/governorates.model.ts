import { t } from 'elysia';
import { GovernoratePlain } from '@/generated/prismabox/Governorate';

export const GovernorateModel = {
  UserGovernorateListResponse: t.Array(GovernoratePlain),
};
