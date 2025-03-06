import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc';
import { signJwt } from '@/utils/auth';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const accounts = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { username, password } }) => {
      const admin = await prisma.admin.findUnique({
        where: { username },
      });

      if (!admin) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Admin not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password' });
      }

      const token = await signJwt({
        id: admin.id,
        isRoot: admin.isRoot,
        username: admin.username,
      });

      return token;
    }),
});
