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

export class ValidationError extends Error {
  statusCode: number;
  errors: string[];

  constructor({
    statusCode = 400,
    message = 'Validation Error',
    errors = [],
  }: { statusCode?: number; message?: string; errors?: string[] }) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
