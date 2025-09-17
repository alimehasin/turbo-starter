import { prisma } from "@repo/db";
import { dunna } from "dunna";

export async function seedPosts() {
  const promises = [];
  const count = dunna.basic.integer({ min: 100, max: 1000 });

  for (let i = 0; i < count; i++) {
    const promise = prisma.post.create({
      data: {
        title: `Post ${i}`,
        content: `Content ${i}`,
      },
    });

    promises.push(promise);
  }

  await Promise.all(promises);
}
