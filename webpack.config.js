const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/index.js')
  ],
  node: {
    fs: 'empty'
  },
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'client/bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'client/style.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: false
              }
            }
          ]
        }))
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
