import { verifyJwt } from '@/utils/auth';
import { HttpError } from './errors';

type OmitFields<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function omit<T, K extends keyof T>(obj: T, fields: K[]): OmitFields<T, K> {
  const result = {} as OmitFields<T, K>;

  for (const key in obj) {
    if (!fields.includes(key as unknown as K)) {
      (result as T)[key] = obj[key];
    }
  }

  return result;
}

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
