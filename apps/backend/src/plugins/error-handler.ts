import { Elysia, status } from 'elysia';
import { HttpError } from '@/utils/error';

export const errorHandler = new Elysia({ name: 'error-handler' })

  // Error Handler
  .error({ HttpError })
  .onError(({ code, error }) => {
    if (code === 'HttpError') {
      return status(error.statusCode, { message: error.message });
    }
  })

  // Global
  .as('global');
