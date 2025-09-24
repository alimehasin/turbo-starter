import { prisma } from '@db/client';
import { Elysia } from 'elysia';
import { env } from '@/env';
import { betterAuth } from '@/plugins/better-auth';
import { setup } from '@/setup';
import {
  deleteObjects,
  uploadImage,
  uploadVideo,
} from '@/utils/clients/s3/helpers';
import { HttpError } from '@/utils/error';
import { FileModel } from './files.model';

export const files = new Elysia({ prefix: '/files' })

  // Plugins
  .use(setup)
  .use(betterAuth)
  .guard({ mustBeAuthed: true })
  .model(FileModel)

  .post(
    '/upload',
    async ({ t, user, body }) => {
      const isPublic = body.isPublic === 'true';

      if (body.type === 'Image') {
        const { key, size } = await uploadImage({
          isPublic,
          file: body.file,
          bucketName: env.STORAGE_BUCKET_NAME,
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

      throw new HttpError({
        message: t({
          en: 'Invalid file type',
          ar: 'نوع الملف غير صالح',
        }),
      });
    },
    {
      successStatus: 201,
      body: 'UserFileCreateBody',
      response: {
        201: 'UserFileCreateResponse',
        400: 'BadRequestError',
      },
    },
  )

  .delete(
    '/:id',
    async ({ t, user, params: { id } }) => {
      const file = await prisma.file.findUnique({
        where: { id, userId: user.id },
      });

      if (!file) {
        throw new HttpError({
          statusCode: 404,
          message: t({
            en: 'File not found',
            ar: 'يعتذر ايجاد الملف',
          }),
        });
      }

      await deleteObjects(env.STORAGE_BUCKET_NAME, [file.key]);
      await prisma.file.delete({ where: { id } });
    },
    {
      successStatus: 204,
      response: {
        204: 'UserFileDeleteResponse',
        400: 'BadRequestError',
      },
    },
  );
