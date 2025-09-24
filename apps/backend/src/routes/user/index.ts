import { Elysia } from 'elysia';
import { files } from './files';
import { governorates } from './governorates';

export const user = new Elysia({ prefix: '/user', tags: ['User'] })

  // Routes
  .use(files)
  .use(governorates);
