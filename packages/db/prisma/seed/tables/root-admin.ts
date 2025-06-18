import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { env } from '@/env';

export async function seedRootAdmin(prisma: PrismaClient) {
  const username = env.ROOT_USERNAME;
  const password = env.ROOT_PASSWORD;

  if (!username || !password) {
    throw new Error('ROOT_USERNAME and ROOT_PASSWORD must be set');
  }

  await prisma.admin.create({
    data: {
      username,
      password: bcrypt.hashSync(password, 12),
      name: 'المستخدم الاساسي',
      phone: '+9647701234567',
      isRoot: true,
    },
  });
}
