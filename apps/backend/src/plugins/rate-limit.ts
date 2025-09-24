import { rateLimit as elysiaRateLimit } from 'elysia-rate-limit';

export const rateLimit = elysiaRateLimit({
  max: 100,
  duration: 60 * 1000,
});
