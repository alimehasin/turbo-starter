import { prisma } from '@db/client';
import type { Prisma } from '@prisma/client';
import { Elysia } from 'elysia';
import { setup } from '@/setup';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import { GovernorateModel } from './governorates.model';

export const governorates = new Elysia({ prefix: '/governorates' })
  .use(setup)
  .model(GovernorateModel)

  .get(
    '/',
    async ({ query }) => {
      const where: Prisma.GovernorateWhereInput = {
        name: { contains: query.search, mode: 'insensitive' },
      };

      const total = await prisma.governorate.count({ where });
      const data = await prisma.governorate.findMany({
        ...parsePaginationProps(query),
        ...parseSortingProps(query),

        where,
      });

      return { total, data };
    },
    {
      query: 'AdminGovernorateListQuery',
      response: {
        200: 'AdminGovernorateListResponse',
        400: 'BadRequestError',
      },
    },
  )

  .post(
    '/',
    async ({ body }) => {
      return prisma.governorate.create({
        data: body,
      });
    },
    {
      successStatus: 201,
      body: 'AdminGovernorateCreateBody',
      response: {
        201: 'AdminGovernorateCreateResponse',
        400: 'BadRequestError',
      },
    },
  )

  .patch(
    '/:id',
    async ({ params: { id }, body }) => {
      return prisma.governorate.update({
        where: { id },
        data: body,
      });
    },
    {
      body: 'AdminGovernorateUpdateBody',
      params: 'AdminGovernorateUpdateParams',
      response: {
        200: 'AdminGovernorateUpdateResponse',
        400: 'BadRequestError',
      },
    },
  )

  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await prisma.governorate.delete({
        where: { id },
      });
    },
    {
      successStatus: 204,
      params: 'AdminGovernorateDeleteParams',
      response: {
        204: 'AdminGovernorateDeleteResponse',
        400: 'BadRequestError',
      },
    },
  );
