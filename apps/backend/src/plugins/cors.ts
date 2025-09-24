import { cors as elysiaCors } from '@elysiajs/cors';

export const cors = elysiaCors({
  credentials: true,
  origin: 'http://localhost:3001',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});
