import { input, password, select } from '@inquirer/prompts';
import { copyEnvFile, getRootDirName, searchEnvExampleFiles } from './helpers';
import { generateSecretKey } from './helpers';

// Env
const nodeEnv = await select({
  message: 'Select node environment',
  choices: [
    { name: 'Development', value: 'development' },
    { name: 'Production', value: 'production' },
  ],
});

// Ports
const backendPort = await input({
  message: 'Backend Port',
  default: '3000',
  required: true,
});
const dashboardPort = await input({
  message: 'Dashboard Port',
  default: '3001',
  required: true,
});

// Auth
const rootUsername = await input({
  message: 'Root Username',
  default: 'root',
  required: true,
});
const rootPassword = await input({
  message: 'Root Password',
  default: 'root',
  required: true,
});
const authTokenExpiration = await input({
  message: 'Auth Token Expiration',
  default: '30d',
});

// Database
const dbName = await input({
  message: 'Database Name',
  default: 'postgres',
  required: true,
});
const dbUser = await input({
  message: 'Database User',
  default: 'postgres',
  required: true,
});
const dbPassword = await input({
  message: 'Database Password (random if empty)',
});
const dbDomain = await input({
  message: 'Database Domain',
  default: 'localhost',
  required: true,
});
const dbPort = await input({
  message: 'Database Port',
  default: '5432',
  required: true,
});

// Storage
const storageBucketName = await input({
  message: 'Storage Bucket Name',
  default: 'bucket',
  required: true,
});
const storageRegion = await input({ message: 'Storage Region' });
const storageEndpoint = await input({ message: 'Storage Endpoint' });
const storageAccessKey = await input({ message: 'Storage Access Key' });
const storageSecretKey = await password({ message: 'Storage Secret Key' });

const secrets = [
  { old: 'PROJECT-NAME', new: getRootDirName() },
  { old: 'NODE-ENV', new: nodeEnv },

  { old: 'BACKEND-PORT', new: backendPort },
  { old: 'DASHBOARD-PORT', new: dashboardPort },

  { old: 'ROOT-USERNAME', new: rootUsername },
  { old: 'ROOT-PASSWORD', new: rootPassword },
  { old: 'AUTH-TOKEN-EXPIRATION', new: authTokenExpiration },
  { old: 'JWT-SECRET-KEY', new: generateSecretKey() },

  { old: 'POSTGRES-USER', new: dbUser },
  { old: 'POSTGRES-PASSWORD', new: dbPassword || generateSecretKey() },
  { old: 'POSTGRES-DB', new: dbName },
  { old: 'POSTGRES-DOMAIN', new: dbDomain },
  { old: 'POSTGRES-PORT', new: dbPort },

  { old: 'STORAGE-REGION', new: storageRegion },
  { old: 'STORAGE-ENDPOINT', new: storageEndpoint },
  { old: 'STORAGE-ACCESS-KEY', new: storageAccessKey },
  { old: 'STORAGE-SECRET-KEY', new: storageSecretKey },
  { old: 'STORAGE-BUCKET-NAME', new: storageBucketName },

  {
    old: 'STORAGE-BASE-URL',
    new: `${storageEndpoint}/${storageBucketName}`,
  },
];

const exampleEnvFilesPaths = searchEnvExampleFiles('.', 0, 3);

for (const exampleEnvFilePath of exampleEnvFilesPaths) {
  await copyEnvFile(exampleEnvFilePath, secrets);
}
