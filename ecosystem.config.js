module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'bun',
      args: 'start',
      cwd: './apps/backend',
    },

    {
      name: 'dashboard',
      script: 'bun',
      args: 'start',
      cwd: './apps/dashboard',
    },
  ],
};
