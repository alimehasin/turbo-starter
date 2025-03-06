'use server';

import { verifyJwt } from '@/utils/auth';
import { TOKEN_KEY } from '@/utils/constants';
import { cookies } from 'next/headers';

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
