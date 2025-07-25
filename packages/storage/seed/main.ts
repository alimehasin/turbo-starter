import { readdir } from 'node:fs/promises';
import Bun from 'bun';
import { env } from '@/env';
import { uploadImage } from '@/helpers';

const paths = ['./seed/assets/avatars'];

// Process all paths concurrently
const allPromises = paths.map(async (path) => {
  const filesNames = await readdir(path);

  // Process all files in this directory concurrently
  const filePromises = filesNames.map(async (fileName) => {
    const bunFile = Bun.file(`${path}/${fileName}`);
    const arrayBuffer = await bunFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = new File([buffer], fileName);

    return uploadImage({
      file,
      isPublic: true,
      useNameAsKey: true,
      bucketName: env.STORAGE_BUCKET_NAME,
    });
  });

  return Promise.all(filePromises);
});

await Promise.all(allPromises);
