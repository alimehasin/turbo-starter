import { input, password, select } from '@inquirer/prompts';
import { generateSecretKey } from './helpers';

export const answers = {
  nodeEnv: await select({
    message: 'Select node environment',
    choices: [
      { name: 'Development', value: 'development' },
      { name: 'Production', value: 'production' },
    ],
  }),

  backendPort: await input({
    message: 'Backend Port',
    default: '3000',
  }),

  dashboardPort: await input({
    message: 'Dashboard Port',
    default: '3001',
  }),

  websitePort: await input({
    message: 'Website Port',
    default: '3002',
  }),

  jwtSecretKey: generateSecretKey(16),

  rootUsername: await input({
    message: 'Root Username',
    default: 'root',
  }),

  rootPassword:
    (await password({ message: 'Root Password (random if empty)' })) ||
    generateSecretKey(6),

  autoTokenExpiration: await input({
    message: 'Auth Token Expiration',
    default: '30d',
  }),

  dbName: await input({
    message: 'Database Name',
    default: 'postgres',
  }),

  dbUser: await input({
    message: 'Database User',
    default: 'postgres',
  }),

  dbPassword:
    (await password({ message: 'Database Password (random if empty)' })) ||
    generateSecretKey(16),

  dbDomain: await input({
    message: 'Database Domain',
    default: 'localhost',
    required: true,
  }),

  dbPort: await input({
    message: 'Database Port',
    default: '5432',
  }),

  storageBucketName: await input({
    message: 'Storage Bucket Name',
    default: 'bucket',
  }),

  storageRegion: await input({
    message: 'Storage Region',
  }),

  storageEndpoint: await input({
    message: 'Storage Endpoint',
  }),

  storageAccessKey: await input({
    message: 'Storage Access Key',
  }),

  storageSecretKey: await password({
    message: 'Storage Secret Key',
  }),
};
