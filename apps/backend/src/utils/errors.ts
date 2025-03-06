export class HttpError extends Error {
  constructor(
    public message = 'Bad Request',
    public statusCode = 400,
  ) {
    super(message);
  }
}

export class AuthError extends HttpError {
  constructor(public message = 'Unauthorized') {
    super(message, 401);
  }
}
