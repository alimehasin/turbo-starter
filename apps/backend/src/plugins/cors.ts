import { cors as elysiaCors } from '@elysiajs/cors';

export const cors = elysiaCors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
});
