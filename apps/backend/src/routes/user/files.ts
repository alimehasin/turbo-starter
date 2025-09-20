import { prisma } from "@db/client";
import { Elysia, t } from "elysia";
import { env } from "@/env";
import { FileType } from "@/generated/prisma/client";
import { betterAuth } from "@/plugins/better-auth";
import { setup } from "@/setup";
import {
  deleteObjects,
  uploadImage,
  uploadVideo,
} from "@/utils/clients/s3/helpers";
import { HttpError } from "@/utils/error";

export const files = new Elysia({ prefix: "/files" })

  // Plugins
  .use(setup)
  .use(betterAuth)
  .guard({ mustBeAuthed: true })

  .post(
    "/upload",
    async ({ t, user, body }) => {
      const isPublic = body.isPublic === "true";

      if (body.type === "Image") {
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

      if (body.type === "Video") {
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
          en: "Invalid file type",
          ar: "نوع الملف غير صالح",
        }),
      });
    },
    {
      body: t.Object({
        file: t.File(),
        type: t.Enum(FileType),
        isPublic: t.Union([t.Literal("true"), t.Literal("false")]),
      }),
    },
  )

  .delete(
    "/:id",
    async ({ t, user, params: { id } }) => {
      const file = await prisma.file.findUnique({
        where: { id, userId: user.id },
      });

      if (!file) {
        throw new HttpError({
          statusCode: 404,
          message: t({
            en: "File not found",
            ar: "يعتذر ايجاد الملف",
          }),
        });
      }

      await deleteObjects(env.STORAGE_BUCKET_NAME, [file.key]);
      await prisma.file.delete({ where: { id } });
    },
    {},
  );
