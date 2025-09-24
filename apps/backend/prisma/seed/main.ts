import { PrismaClient } from '@prisma/client';
import { env } from '@/env';
import { seedFiles } from './tables/files';
import { seedGovernorates } from './tables/governorates';

const prisma = new PrismaClient();

async function main() {
  if (env.NODE_ENV !== 'development') {
    return;
  }

  await seedFiles(prisma);
  await seedGovernorates(prisma);
}

await main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
