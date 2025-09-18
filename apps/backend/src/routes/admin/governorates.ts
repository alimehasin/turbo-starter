import { prisma } from "@db/client";
import { Elysia, t } from "elysia";
import type { Prisma } from "@/generated/prisma";
import { Governorate } from "@/generated/prismabox/Governorate";
import { setup } from "@/setup";
import { parsePaginationProps, parseSortingProps } from "@/utils/helpers";
import { paginationSchema, sortingSchema } from "@/utils/schemas";

export const governorates = new Elysia({ prefix: "/governorates" })
  .use(setup)

  .get(
    "/",
    async ({ query: { page, pageSize, sortingColumn, sortingDirection } }) => {
      const where: Prisma.GovernorateWhereInput = {};

      const total = await prisma.governorate.count({ where });
      const data = await prisma.governorate.findMany({
        where,

        ...parsePaginationProps({ page, pageSize }),
        ...parseSortingProps({ sortingColumn, sortingDirection }),
      });

      return { total, data };
    },
    {
      query: t.Object({
        ...paginationSchema,
        ...sortingSchema,
      }),
      response: {
        200: t.Object({
          total: t.Number(),
          data: t.Array(Governorate),
        }),
      },
    },
  )

  .post(
    "/",
    async ({ body }) => {
      return prisma.governorate.create({
        data: body,
      });
    },
    {
      body: t.Object({
        name: t.String(),
      }),
      response: {
        200: Governorate,
      },
    },
  );
