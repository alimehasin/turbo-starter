import chalk from 'chalk';
import { Elysia, status } from 'elysia';
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
  .onError(({ code, error }) => {
    if (code === 'HttpError') {
      return status(error.statusCode, { message: error.message });
    }

    if (code === 'AuthError') {
      return status(401, { message: error.message });
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
