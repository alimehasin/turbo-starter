import { t } from 'elysia';

export const SetupModel = {
  BadRequestError: t.Union([
    t.Object(
      {
        errorCode: t.Literal('HttpError'),
        message: t.String(),
      },
      { title: 'HttpError' },
    ),
    t.Object(
      {
        errorCode: t.Literal('ValidationError'),
        errors: t.Array(t.String()),
      },
      { title: 'ValidationError' },
    ),
  ]),
};
