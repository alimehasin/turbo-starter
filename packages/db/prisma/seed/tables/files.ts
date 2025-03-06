import type { PrismaClient } from '@prisma/client';

export async function seedFiles(prisma: PrismaClient) {
  await prisma.file.createMany({
    data: [
      { key: 'avatar-male-1.webp', size: 0, type: 'Image' },
      { key: 'avatar-male-2.webp', size: 0, type: 'Image' },
      { key: 'avatar-male-3.webp', size: 0, type: 'Image' },
      { key: 'avatar-male-4.webp', size: 0, type: 'Image' },
      { key: 'avatar-male-5.webp', size: 0, type: 'Image' },
      { key: 'avatar-female-1.webp', size: 0, type: 'Image' },
      { key: 'avatar-female-2.webp', size: 0, type: 'Image' },
      { key: 'avatar-female-3.webp', size: 0, type: 'Image' },
      { key: 'avatar-female-4.webp', size: 0, type: 'Image' },
      { key: 'avatar-female-5.webp', size: 0, type: 'Image' },
    ],
  });
}
