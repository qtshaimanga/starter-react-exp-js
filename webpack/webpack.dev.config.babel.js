import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'

export default {
  cache: true,
  context: path.resolve( __dirname, '..' ),
  devtool: 'eval',
  entry: {
    vendor: [
      'gsap',
      'dom-hand',
      'three'
    ],
    app: [
      './client/index.js'
    ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'app.bundle.js',
    pathinfo: true
  },
  resolve: {
    modules: [
      path.resolve( __dirname, '..', 'client' ),
      'node_modules'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        exclude: [ /node_modules/, /client\/vendor/ ],
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  autoprefixer( { browsers: [ 'last 2 versions' ] } )
                ]
              }
            }
          },
          {
            loader: 'stylus-loader'
          },
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: 'client/templates/index.tpl.ejs',
      inject: 'body',
      filename: 'index.html',
      hash: true,
      environment: process.env.NODE_ENV
    } ),
    new webpack.optimize.CommonsChunkPlugin( {
      name: 'vendor',
      filename: 'vendor.bundle.js'
    } ),
    new webpack.DefinePlugin( {
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
      '__DEV__': JSON.stringify( true ),
      '__PROD__': JSON.stringify( false )
    } ),
    new webpack.ProvidePlugin( {
      'dom': 'dom-hand',
      'THREE': 'three'
    } ),
    new CopyWebpackPlugin( [
      { from: 'static' }
    ],
    { ignore: [ '.DS_Store', '.keep' ] } )
  ]
}