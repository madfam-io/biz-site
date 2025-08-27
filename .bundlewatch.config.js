module.exports = {
  files: [
    {
      path: '.next/static/chunks/pages/_app-*.js',
      maxSize: '250kb',
      compression: 'gzip',
    },
    {
      path: '.next/static/chunks/main-*.js',
      maxSize: '50kb',
      compression: 'gzip',
    },
    {
      path: '.next/static/css/*.css',
      maxSize: '30kb',
      compression: 'gzip',
    },
  ],
  normalizeFilenames: /\-[a-z0-9]{6}\./,
  ci: {
    trackBranches: ['main'],
    repoBranchBase: 'main',
  },
};
