import { prisma } from '@db/client';
import { Elysia } from 'elysia';
import { setup } from '@/setup';
import { GovernorateUserModel } from './governorates.user.model';

export const governorates = new Elysia({ prefix: '/governorates' })
  .use(setup)
  .model(GovernorateUserModel)

  .get(
    '/',
    async () => {
      return prisma.governorate.findMany();
    },
    {
      response: {
        200: 'UserGovernorateListResponse',
        400: 'BadRequestError',
      },
    },
  );
