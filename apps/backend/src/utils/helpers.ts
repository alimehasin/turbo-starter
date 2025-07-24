import { verifyJwt } from '@/utils/auth';
import { HttpError } from './errors';

export async function authenticate({
  token,
  errorMessage,
}: {
  token: string;
  errorMessage: string;
}) {
  if (!token) {
    throw new HttpError({
      statusCode: 401,
      message: errorMessage,
    });
  }

  try {
    return await verifyJwt(token);
  } catch (_) {
    throw new HttpError({
      statusCode: 401,
      message: errorMessage,
    });
  }
}

export async function authenticateSafe(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    return await verifyJwt(token);
  } catch (_) {
    return null;
  }
}
