'use server';

import { cookies } from 'next/headers';

export async function getLocale() {
  const cookieStore = await cookies();
  return cookieStore.get('locale')?.value ?? 'en';
}

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('locale', locale);
}
