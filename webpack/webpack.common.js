const path = require('path')
const webpack = require('webpack')
const autoprefixer = require ('autoprefixer')

module.exports =  {
  context: path.resolve( __dirname, '..' ),
  target: "web",
  externals: ["react"],
  entry: './client/App.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/', //-> solve to prod cf. ./
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
          presets: ['react', 'es2015']
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
  }
}
