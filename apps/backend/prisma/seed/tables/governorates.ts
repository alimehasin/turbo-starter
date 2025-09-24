import type { PrismaClient } from '@prisma/client';
import { governorates } from '../utils/data/governorate';
import { logSeedTable } from '../utils/helpers';

export async function seedGovernorates(prisma: PrismaClient) {
  logSeedTable('governorates');

  await prisma.governorate.createMany({
    data: governorates.map((name) => ({ name })),
  });
}
