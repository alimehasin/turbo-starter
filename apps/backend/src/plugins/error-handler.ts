import { Elysia, status } from 'elysia';
import { HttpError, ValidationError } from '@/utils/error';

export const errorHandler = new Elysia({ name: 'error-handler' })

  // Error Handler
  .error({ HttpError, ValidationError })
  .onError(({ code, error }) => {
    if (code === 'HttpError') {
      return status(error.statusCode, {
        errorCode: 'HttpError',
        message: error.message,
      });
    }

    if (code === 'ValidationError') {
      return status(error.statusCode, {
        errorCode: 'ValidationError',
        errors: error.errors,
      });
    }
  })

  // Global
  .as('global');
