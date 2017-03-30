import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import autoprefixer from 'autoprefixer'

export default {
  cache: true,
  context: path.resolve( __dirname, '..' ),
  devtool: 'eval',
  entry: {
    app: [
      'gsap',
      'dom-hand',
      'three',
      'react',
      'react-dom',
      './client/App.js'
    ]
  },
  output: {
    path: path.join( __dirname, '..', 'dist' ),
    filename: 'all.min.js'
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
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /node_modules/,
        loader: 'ify-loader'
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'glslify-loader'
          }
        ]
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
      '__DEV__': JSON.stringify( true ),
      '__PROD__': JSON.stringify( false )
    }),
    new webpack.ProvidePlugin({
      'dom': 'dom-hand',
      'THREE': 'three',
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new CopyWebpackPlugin( [ { from: 'static' } ], { ignore: [ '.DS_Store', '.keep' ] } ),
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: [ 'console.log' ]
      }
    } ),
    new ExtractTextPlugin( { filename: 'all.min.css', allChunks: true } ),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin( [ 'dist' ], { root: path.join( __dirname, '..' ) } )
  ]
}