const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = file => path.resolve(__dirname, file)

const postcss = [
  require('autoprefixer')({ browsers: ['last 2 versions'] })
]

module.exports = {
  devtool: '#source-map',
  entry: {
    app: resolve('../src/client-entry.ts'),
    vendor: ['vue', 'vue-router', 'vuex', 'apollo-client', 'es6-promise']
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name]-bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.vue'],
    alias: {
      $components: resolve('../src/components'),
      $views: resolve('../src/views'),
      $lib: resolve('../src/lib')
    }
  },
  resolveLoader: {
    root: resolve('../node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'babel!ts'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!postcss')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)(\?\S*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  postcss,
  vue: {
    postcss
  },
  externals: []
}
