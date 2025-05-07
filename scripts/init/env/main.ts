import { answers } from './answers';
import {
  copyEnvFile,
  generateSecretKey,
  getRootDirName,
  searchEnvExampleFiles,
} from './helpers';

const exampleEnvFilesPaths = searchEnvExampleFiles('.', 0, 3);

for (const exampleEnvFilePath of exampleEnvFilesPaths) {
  await copyEnvFile(exampleEnvFilePath, [
    { old: 'PROJECT-NAME', new: getRootDirName() },
    { old: 'NODE-ENV', new: answers.nodeEnv },

    { old: 'BACKEND-PORT', new: answers.backendPort },
    { old: 'DASHBOARD-PORT', new: answers.dashboardPort },

    { old: 'ROOT-USERNAME', new: answers.rootUsername },
    { old: 'ROOT-PASSWORD', new: answers.rootPassword },
    { old: 'AUTH-TOKEN-EXPIRATION', new: answers.autoTokenExpiration },
    { old: 'JWT-SECRET-KEY', new: generateSecretKey() },

    { old: 'POSTGRES-USER', new: answers.dbUser },
    { old: 'POSTGRES-PASSWORD', new: answers.dbPassword || generateSecretKey() },
    { old: 'POSTGRES-DB', new: answers.dbName },
    { old: 'POSTGRES-DOMAIN', new: answers.dbDomain },
    { old: 'POSTGRES-PORT', new: answers.dbPort },

    { old: 'STORAGE-REGION', new: answers.storageRegion },
    { old: 'STORAGE-ENDPOINT', new: answers.storageEndpoint },
    { old: 'STORAGE-ACCESS-KEY', new: answers.storageAccessKey },
    { old: 'STORAGE-SECRET-KEY', new: answers.storageSecretKey },
    { old: 'STORAGE-BUCKET-NAME', new: answers.storageBucketName },

    {
      old: 'STORAGE-BASE-URL',
      new: `${answers.storageEndpoint}/${answers.storageBucketName}`,
    },
  ]);
}
