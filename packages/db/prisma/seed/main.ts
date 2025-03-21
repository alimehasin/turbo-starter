import { env } from '@/env';
import { PrismaClient } from '@prisma/client';
import { seedFiles } from './tables/files';
import { seedRootAdmin } from './tables/root-admin';

const prisma = new PrismaClient();

async function main() {
  await seedRootAdmin(prisma);

  if (env.NODE_ENV === 'development') {
    await seedFiles(prisma);
  }
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
