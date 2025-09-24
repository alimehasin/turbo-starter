import { cron } from '@elysiajs/cron';

export const storageCleaner = cron({
  name: 'storage-cleaner',
  pattern: '0 4 * * *',
  run: async () => {},
});
