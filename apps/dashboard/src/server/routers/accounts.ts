import { prisma } from '@repo/db';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod/v4';
import { signJwt } from '@/server/actions/auth';
import { publicProcedure, router } from '@/server/trpc';

export const accounts = router({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ ctx: { t }, input: { username, password } }) => {
      const admin = await prisma.admin.findUnique({
        where: { username },
      });

      if (!admin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: t({
            en: 'Admin not found',
            ar: 'المدير غير موجود',
          }),
        });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: t({
            en: 'Invalid password',
            ar: 'كلمة المرور غير صحيحة',
          }),
        });
      }

      const token = await signJwt({
        id: admin.id,
        isRoot: admin.isRoot,
        username: admin.username,
      });

      return token;
    }),
});
