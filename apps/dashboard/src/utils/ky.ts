import baseKy from 'ky';
import { env } from '@/env';

export const ky = baseKy.create({
  prefixUrl: env.NEXT_PUBLIC_API_BASE_URL,
});
