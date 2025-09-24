import { Elysia } from 'elysia';
import { files } from './files';

export const user = new Elysia({ prefix: '/user', tags: ['User'] })

  // Routes
  .use(files);
