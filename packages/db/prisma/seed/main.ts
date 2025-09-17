import { PrismaClient } from "@prisma/client";
import { seedPosts } from "./tables/posts";

const prisma = new PrismaClient();

async function main() {
  await seedPosts();
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
