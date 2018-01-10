const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CopyWebpackPlugin = require ('copy-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require ('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  cache: true,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'client/templates/index.tpl.ejs',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      minify: {
       removeComments: true,
       collapseWhitespace: true,
       removeAttributeQuotes: true
     }
   }),
   new webpack.NoEmitOnErrorsPlugin(),
   new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false,
       drop_console: true,
       pure_funcs: [ 'console.log' ]
     }
   }),
   new ExtractTextPlugin( { filename: 'all.min.css', allChunks: true } ),
   new OptimizeCssAssetsPlugin(),
   new CleanWebpackPlugin( [ 'dist' ], { root: path.join( __dirname, '..' ) } )
  ]
});
