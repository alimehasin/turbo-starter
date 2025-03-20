import { env } from '@/env';
import { setup } from '@/setup';
import { HttpError } from '@/utils/errors';
import { authenticate } from '@/utils/helpers';
import { FileType } from '@prisma/client';
import { uploadImage, uploadVideo } from '@repo/storage';
import Elysia, { t } from 'elysia';

export const files = new Elysia({ prefix: '/files' })
  .use(setup)

  .post(
    '/upload',
    async ({ bearer, body, prisma, t }) => {
      const user = await authenticate(bearer);
      const isPublic = body.isPublic === 'true';

      if (body.type === 'Image') {
        const { key, size } = await uploadImage({
          file: body.file,
          bucketName: env.STORAGE_BUCKET_NAME,
          isPublic,
        });

        return prisma.file.create({
          data: {
            key,
            size,
            isPublic,
            userId: user.id,
            type: body.type,
          },
        });
      }

      if (body.type === 'Video') {
        const { key, size } = await uploadVideo({
          file: body.file,
          bucketName: env.STORAGE_BUCKET_NAME,
          isPublic,
        });

        return prisma.file.create({
          data: {
            key,
            size,
            isPublic,
            type: body.type,
            userId: user.id,
          },
        });
      }

      throw new HttpError(
        t({
          en: 'Invalid file type',
          ar: 'نوع الملف غير صالح',
        }),
      );
    },
    {
      body: t.Object({
        file: t.File(),
        type: t.Enum(FileType),
        isPublic: t.Union([t.Literal('true'), t.Literal('false')]),
      }),
    },
  );
