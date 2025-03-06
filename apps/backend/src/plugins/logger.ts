import chalk from 'chalk';
import Elysia from 'elysia';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
type Methods = (typeof METHODS)[number];

interface LoggerParams {
  method: Methods;
  status: number;
  path: string;
}

export const log = (params: LoggerParams) => {
  if (!METHODS.includes(params.method) || typeof params.status !== 'number') {
    return;
  }

  const method = chalk.bold.blue(params.method);

  const status =
    params.status >= 400
      ? chalk.bold.red(params.status)
      : params.status >= 300
        ? chalk.bold.yellow(params.status)
        : params.status >= 200
          ? chalk.bold.green(params.status)
          : chalk.bold.gray(params.status);

  const path = chalk.bold.cyan(params.path);

  console.log(`${method} ${status} ${path}`);
};

export const logger = new Elysia({ name: 'logger' })
  .derive({ as: 'global' }, () => ({ start: Date.now() }))

  .onError({ as: 'global' }, (ctx) => {
    log({
      method: ctx.request.method as Methods,
      status: ctx.set.status as number,
      path: ctx.path,
    });
  })

  .onAfterResponse({ as: 'global' }, (ctx) => {
    log({
      method: ctx.request.method as Methods,
      status: ctx.set.status as number,
      path: ctx.path,
    });
  });
