'use server';

import { env } from '@/env';
import type { AuthPayload } from '@/types';
import { TOKEN_KEY } from '@/utils/constants';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function signJwt(payload: AuthPayload): Promise<string> {
  const token = new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(env.AUTH_TOKEN_EXPIRATION)
    .sign(new TextEncoder().encode(env.JWT_SECRET_KEY));

  return token;
}

export async function verifyJwt(token: string): Promise<AuthPayload> {
  const secret = new TextEncoder().encode(env.JWT_SECRET_KEY);
  const { payload } = await jwtVerify<AuthPayload>(token, secret);

  return payload;
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token);
}

export async function authenticate(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const payload = await verifyJwt(token);

    return payload;
  } catch (_) {
    return null;
  }
}
