import chalk from 'chalk';
import { Elysia, error } from 'elysia';
import { env } from './env';
import { cors, crons, logger, swagger } from './plugins';
import { accounts } from './routes/accounts';
import { files } from './routes/files';
import { AuthError, HttpError } from './utils/errors';

export const app = new Elysia()
  .use(logger)
  .use(cors)
  .use(swagger)
  .use(crons)

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

  .use(accounts)
  .use(files)

  .listen(env.PORT, ({ url }) => {
    console.log(`🚀 Server is running at ${chalk.green(url)}`);
  });
