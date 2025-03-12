import { env } from '@/env';
import { cron as elysiaCron } from '@elysiajs/cron';
import type { Prisma } from '@prisma/client';
import { prisma } from '@repo/db';
import { deleteObjects } from '@repo/storage';
export const crons = elysiaCron({
  name: 'storage-cleaner',
  pattern: '0 4 * * *',
  run: async () => {
    console.log('Storage cleaner is running');

    // Put Your filter here
    const where: Prisma.FileWhereInput = {
      userId: '0',
    };

    const files = await prisma.file.findMany({ where });

    await deleteObjects(
      env.STORAGE_BUCKET_NAME,
      files.map((file) => file.key),
    );

    await prisma.file.deleteMany({ where });
  },
});
