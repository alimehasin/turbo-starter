import { setup } from '@/setup';
import { signJwt } from '@/utils/auth';
import { authenticate, omit } from '@/utils/helpers';
import bcrypt from 'bcryptjs';
import Elysia, { error, t } from 'elysia';

export const users = new Elysia({ prefix: '/users' })
  .use(setup)

  .post(
    '/login',
    async ({ prisma, body: { username, password } }) => {
      const user = await prisma.user.findUnique({ where: { username } });

      const err = error(400, {
        message: 'Unable to login with provided credentials',
      });

      if (!user) {
        return err;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return err;
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
    async ({ prisma, body }) => {
      const user = await prisma.user.findUnique({
        where: { username: body.username },
      });

      if (user) {
        return error(400, { message: 'User already exists' });
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

  .get('/profile', async ({ prisma, bearer }) => {
    const user = await authenticate(bearer);

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      include: { avatar: { select: { key: true } } },
    });

    if (!profile) {
      return error(404, { message: 'Profile not found' });
    }

    return omit(profile, ['password']);
  });
