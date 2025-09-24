import Elysia from 'elysia';
import { storageCleaner } from './storage-cleaner';

export const crons = new Elysia({ name: 'crons' })

  // Crons
  .use(storageCleaner);
