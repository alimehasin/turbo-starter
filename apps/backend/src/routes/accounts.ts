import { setup } from '@/setup';
import { signJwt } from '@/utils/auth';
import { HttpError } from '@/utils/errors';
import { authenticate, omit } from '@/utils/helpers';
import bcrypt from 'bcryptjs';
import { Elysia, t } from 'elysia';

export const accounts = new Elysia({ prefix: '/accounts' })
  .use(setup)

  .post(
    '/login',
    async ({ t, prisma, body: { username, password } }) => {
      const user = await prisma.user.findUnique({ where: { username } });

      const err = new HttpError(
        t({
          en: 'Unable to login with provided credentials',
          ar: 'لا يمكن تسجيل الدخول بالبيانات المقدمة',
        }),
      );

      if (!user) {
        throw err;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw err;
      }

      const token = await signJwt({
        id: user.id,
        username: user.username,
      });

      return { token };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  )

  .post(
    '/register',
    async ({ t, prisma, body }) => {
      const user = await prisma.user.findUnique({
        where: { username: body.username },
      });

      if (user) {
        throw new HttpError(
          t({
            en: 'User already exists',
            ar: 'المستخدم موجود بالفعل',
          }),
        );
      }

      const hashedPassword = await bcrypt.hash(body.password, 12);

      return prisma.user.create({
        data: {
          ...body,
          password: hashedPassword,
        },
      });
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
        name: t.String(),
        phone: t.String(),
        birthDate: t.Date(),
        avatarId: t.Optional(t.String({ format: 'uuid' })),
      }),
    },
  )

  .get(
    '/profile',
    async ({ t, prisma, bearer }) => {
      const user = await authenticate(bearer);

      const profile = await prisma.user.findUnique({
        where: { id: user.id },
        include: { avatar: { select: { key: true } } },
      });

      if (!profile) {
        throw new HttpError(
          t({
            en: 'Profile not found',
            ar: 'الملف الشخصي غير موجود',
          }),
        );
      }

      return omit(profile, ['password']);
    },
    {},
  );
