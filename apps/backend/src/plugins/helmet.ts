import { helmet as elysiaHelmet } from 'elysia-helmet';

export const helmet = elysiaHelmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'unpkg.com', 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'unpkg.com'],
      imgSrc: ['data:'],
    },
  },
});
