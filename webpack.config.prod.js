const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/index.js')
  ],
  node: {
    fs: 'empty',
  },
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'client/bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      }
    }),
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(scss|css)$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      include: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'server/shared')
      ],
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          loader: 'image-webpack-loader',
          query: {
            optipng: {
              optimizationLevel: 7,
            },
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        },
      ],
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    historyApiFallback: true
  }
};
