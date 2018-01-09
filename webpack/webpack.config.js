const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require ('copy-webpack-plugin')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const autoprefixer = require ('autoprefixer')

module.exports =  {
  cache: true,
  context: path.resolve( __dirname, '..' ),
  devtool: 'eval',
  target: "web",
  externals: ["react"],
  entry: './client/App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/',
    pathinfo: true
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve( __dirname, '..', 'client' )
    ],
    extensions: [".js", ".json", ".jsx"]
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
        options: {
          presets: ["es2015"]
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
          }
        ]
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
  performance: {
    hints: "warning",
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.styl') || assetFilename.endsWith('.js')
    }
  },
  devServer: {
    contentBase: path.join( __dirname, 'static' ),
    compress: false,
    noInfo: true,
    stats: 'verbose',
    historyApiFallback: true,
    hot: true,
    inline: true,
    https: false,
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/templates/index.tpl.ejs',
      inject: 'body',
      filename: 'index.html',
      hash: true,
      environment: process.env
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new webpack.ProvidePlugin({
      'GSAP': 'gsap',
      'dom': 'dom-hand',
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new CopyWebpackPlugin( [ { from: 'static' } ], { ignore: [ '.DS_Store', '.keep' ] } )
  ]
}
