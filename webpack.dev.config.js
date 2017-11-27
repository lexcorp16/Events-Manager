const webpack = require('webpack');
const path = require('path');

const parentDir = path.join(__dirname, './client');

module.exports = {
  entry: [
    path.join(parentDir, 'index.js')
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(sass|scss)$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  output: {
    path: path.join(parentDir, '/dist'),
    filename: './client/bundle.js'
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true
  }
};
