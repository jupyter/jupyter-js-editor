var path = require('path');

module.exports = {
  entry: './test/build/index.js',
  output: {
    path: './test/build',
    filename: 'bundle.js'
  },
  bail: true,
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  }
}
