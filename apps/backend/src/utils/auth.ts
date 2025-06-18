import { jwtVerify, SignJWT } from 'jose';
import { env } from '@/env';
import type { AuthPayload } from '@/types';

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
