export class HttpError extends Error {
  statusCode: number;

  constructor({
    statusCode = 400,
    message = 'Bad Request',
  }: { statusCode?: number; message?: string }) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class AuthError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
  }
}
