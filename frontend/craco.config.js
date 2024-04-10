const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~providers': path.resolve(__dirname, 'src/providers'),
      '~constants': path.resolve(__dirname, 'src/constants'),
      '~pages': path.resolve(__dirname, 'src/pages')
    },
  },
};
