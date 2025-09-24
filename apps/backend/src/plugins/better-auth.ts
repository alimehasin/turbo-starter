import { Elysia } from 'elysia';
import { auth } from '@/utils/auth';

export const betterAuth = new Elysia({ name: 'better-auth' })
  .mount('/auth', auth.handler)
  .macro({
    maybeAuthed: {
      async resolve({ request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return {
            user: null,
            session: null,
          };
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },

    mustBeAuthed: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return status(401);
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },

    mustBeAdmin: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session || session.user.role !== 'admin') {
          return status(401);
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
