import { t } from 'elysia';
import { GovernoratePlain } from '@/generated/prismabox/Governorate';

export const GovernorateUserModel = {
  UserGovernorateListResponse: t.Array(GovernoratePlain),
};
