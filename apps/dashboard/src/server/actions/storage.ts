'use server';

import { env } from '@/env';
import { prisma } from '@repo/db';
import { uploadImage, uploadVideo } from '@repo/storage';
import { authenticate, getToken } from './auth';

interface UploadActionProps {
  file: File;
  isPublic: boolean;
}

export async function uploadImageAction({ file, isPublic }: UploadActionProps) {
  const token = await getToken();
  const admin = await authenticate(token);

  if (!admin) {
    throw new Error('Unauthorized');
  }

  const { key, size } = await uploadImage({
    file,
    bucketName: env.STORAGE_BUCKET_NAME,
    isPublic,
  });

  return prisma.file.create({
    data: { key, size, type: 'Image', adminId: admin.id },
  });
}

export async function uploadVideoAction({ file, isPublic }: UploadActionProps) {
  if (!file) {
    return { id: undefined, key: undefined };
  }

  const token = await getToken();
  const admin = await authenticate(token);

  if (!admin) {
    throw new Error('Unauthorized');
  }

  const { key, size } = await uploadVideo({
    file,
    bucketName: env.STORAGE_BUCKET_NAME,
    isPublic,
  });

  return prisma.file.create({
    data: { key, size, type: 'Video', adminId: admin.id },
  });
}
