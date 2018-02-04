const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/index.js')
  ],
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'client/bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
