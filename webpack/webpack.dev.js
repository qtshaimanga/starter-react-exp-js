const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CopyWebpackPlugin = require ('copy-webpack-plugin')

module.exports = merge(common, {
  cache: false,
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        exclude: [ /node_modules/, /client\/vendor/ ],
        loader: 'eslint-loader'
      }
    ]
  },
  performance: {
    hints: "warning",
    maxAssetSize: 50000000,
    maxEntrypointSize: 50000000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.styl') || assetFilename.endsWith('.js')
    }
  },
  devServer: {
    contentBase: path.join( __dirname, '..', 'static' ),
    compress: false,
    noInfo: true,
    stats: 'verbose',
    historyApiFallback: true,
    hot: true,
    inline: true,
    https: false,
    host: '0.0.0.0',
    port: 3000,
    open: false,
    openPage: '',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/*': {
        target: 'http://localhost:8000',
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Developpement',
      template: 'client/templates/index.tpl.ejs',
      filename: 'index.html',
      inject: 'body',
      hash: true,
    }),
    // new CopyWebpackPlugin( [ { from: './static', to: './' } ], { ignore: [ '.DS_Store', '.keep', '.gitkeep' ] } )
  ]
});
