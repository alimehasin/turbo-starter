import type { Prisma } from "@prisma/client";
import { prisma } from "@repo/db";
import { Elysia, t } from "elysia";
import { parsePaginationProps, parseSortingProps } from "@/utils/helpers";

export const posts = new Elysia({ prefix: "/posts" })

  // Routes
  .get(
    "/",
    async ({ query: { page, pageSize, sortingColumn, sortingDirection } }) => {
      const where: Prisma.PostWhereInput = {};

      const total = await prisma.post.count({ where });
      const data = await prisma.post.findMany({
        ...parsePaginationProps({ page, pageSize }),
        ...parseSortingProps({ sortingColumn, sortingDirection }),

        where,
      });

      return { total, data };
    },
    {
      query: t.Object({
        // Pagination
        page: t.Number({ default: 1 }),
        pageSize: t.Number({ default: 10 }),

        // Sorting
        sortingColumn: t.String({ default: "serialNumber" }),
        sortingDirection: t.UnionEnum(["asc", "desc"], { default: "desc" }),
      }),
    },
  );
