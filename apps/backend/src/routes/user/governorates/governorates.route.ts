import { prisma } from '@db/client';
import { Elysia } from 'elysia';
import { setup } from '@/setup';
import { GovernorateModel } from './governorates.model';

export const governorates = new Elysia({ prefix: '/governorates' })
  .use(setup)
  .model(GovernorateModel)

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
