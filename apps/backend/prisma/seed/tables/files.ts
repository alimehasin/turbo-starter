import type { PrismaClient } from '@prisma/client';
import { logSeedTable } from '../utils/helpers';

export async function seedFiles(prisma: PrismaClient) {
  logSeedTable('files');

  const generateImageFiles = (
    prefix: string,
    count: number,
    extraText = '',
  ) => {
    return Array.from({ length: count }, (_, i) => ({
      key: `${prefix}${extraText}${i + 1}.webp`,
      size: 0,
      type: 'Image' as const,
    }));
  };

  await prisma.file.createMany({
    data: [
      { key: 'category.webp', size: 0, type: 'Image' },
      ...generateImageFiles('avatar-male-', 5),
      ...generateImageFiles('avatar-female-', 5),
      ...generateImageFiles('bg-', 10),
    ],
  });
}
