import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from '@/env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructImageUrl(key: string) {
  return `${env.NEXT_PUBLIC_STORAGE_BASE_URL}/${key}`;
}
