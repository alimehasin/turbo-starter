// TODO: Try to replace this with bun
import * as path from 'node:path';

import { DeleteObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { storage } from './client';

export async function deleteObjects(bucketName: string, files: string[]) {
  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: { Objects: files.map((file) => ({ Key: file })) },
  });

  await storage.send(command);
}

export async function uploadObject(
  bucketName: string,
  key: string,
  file: Buffer,
  contentType: string,
  fileSize: number,
  isPublic: boolean,
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
    ContentLength: fileSize,
    ACL: isPublic ? 'public-read' : 'private',
  });

  await storage.send(command);
}

async function compressImage(imageFile: File, fileName: string): Promise<File> {
  const buffer = await imageFile.arrayBuffer();

  const webpBuffer = await sharp(Buffer.from(buffer))
    .webp({ quality: 80 })
    .toBuffer();

  return new File([new Uint8Array(webpBuffer)], fileName, {
    type: 'image/webp',
  });
}

function replaceFileExtension(fileName: string, newExtension: string): string {
  const baseName = fileName.slice(0, fileName.lastIndexOf('.'));
  return `${baseName}.${newExtension}`;
}

export async function uploadImage({
  file,
  bucketName,
  isPublic,
  useNameAsKey = false,
}: {
  file: File;
  bucketName: string;
  isPublic: boolean;
  useNameAsKey?: boolean;
}) {
  const key = useNameAsKey
    ? replaceFileExtension(file.name, 'webp')
    : `${crypto.randomUUID()}.webp`;

  const f = await compressImage(file, key);

  const arrayBuffer = await f.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await uploadObject(bucketName, key, buffer, f.type, f.size, isPublic);

  return { key: key, size: f.size };
}

export async function uploadVideo({
  file,
  bucketName,
  isPublic,
  useNameAsKey = false,
}: {
  file: File;
  bucketName: string;
  isPublic: boolean;
  useNameAsKey?: boolean;
}) {
  const ext = path.extname(file.name);
  const key = useNameAsKey ? file.name : `${crypto.randomUUID()}${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await uploadObject(bucketName, key, buffer, file.type, file.size, isPublic);

  return { key, size: file.size };
}
