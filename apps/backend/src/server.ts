import chalk from 'chalk';
import Elysia, { error } from 'elysia';
import { env } from './env';
import { plugins } from './plugins';
import { files } from './routes/files';
import { users } from './routes/users';
import { AuthError, HttpError } from './utils/errors';

export const app = new Elysia()
  .use(plugins.logger)
  .use(plugins.cors)
  .use(plugins.swagger)
  .use(plugins.crons)

  .error({ HttpError, AuthError })
  .onError(({ code, error: e }) => {
    if (code === 'HttpError') {
      return error(e.statusCode, { message: e.message });
    }

    if (code === 'AuthError') {
      return error(e.statusCode, { message: e.message });
    }
  })

  // Routes
  .get('/', () => ({
    message: 'Made with ❤️ by Ali Mehasin, for docs checkout /docs',
  }))

  .use(users)
  .use(files)

  .listen(env.PORT, ({ url }) => {
    console.log(`🚀 Server is running at ${chalk.green(url)}`);
  });
