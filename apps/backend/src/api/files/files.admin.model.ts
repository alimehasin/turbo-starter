import { FileType } from '@prisma/client';
import { t } from 'elysia';
import { FilePlain } from '@/generated/prismabox/File';

export const FileAdminModel = {
  UserFileCreateBody: t.Object({
    file: t.File(),
    type: t.Enum(FileType),
    isPublic: t.Union([t.Literal('true'), t.Literal('false')]),
  }),

  UserFileCreateResponse: FilePlain,

  UserFileDeleteResponse: t.Any(),
};
