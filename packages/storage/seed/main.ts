import { readdir } from 'node:fs/promises';
import { env } from '@/env';
import { uploadImage } from '@/helpers';

const paths = ['./seed/assets/avatars'];

for (const path of paths) {
  const filesNames = await readdir(path);

  const promises = [];
  for (const fileName of filesNames) {
    const bunFile = Bun.file(`${path}/${fileName}`);
    const arrayBuffer = await bunFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = new File([buffer], fileName);

    const promise = uploadImage({
      file,
      isPublic: true,
      useNameAsKey: true,
      bucketName: env.STORAGE_BUCKET_NAME,
    });

    promises.push(promise);
  }

  await Promise.all(promises);
}
