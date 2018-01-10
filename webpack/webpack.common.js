const path = require('path')
const webpack = require('webpack')
const autoprefixer = require ('autoprefixer')

module.exports =  {
  context: path.resolve( __dirname, '..' ),
  target: "web",
  entry: {
    app: [
      'dom-hand',
      'gsap',
      'react',
      'react-dom',
      './client/App.js'
  ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.bundle.js',
    publicPath: process.env.NODE_ENV === 'prod' ? './' : '/',
    pathinfo: true
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve( __dirname, '..', 'client' )
    ],
    extensions: [".js", ".json", ".jsx", ".styl"]
  },
  module: {
    rules: [
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    }),
    new webpack.ProvidePlugin({
      'dom': 'dom-hand',
      'gsap': 'gsap',
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ]
}
