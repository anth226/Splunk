const path = require('path');
module.exports = {
  webpack: {
    alias: {
      'components': path.resolve(__dirname, 'src/components/'),
      'pages': path.resolve(__dirname, 'src/pages/'),
      'route': path.resolve(__dirname, 'src/route/'),
      'context': path.resolve(__dirname, 'src/context/'),
      'api': path.resolve(__dirname, 'src/api')
    }
  }
}