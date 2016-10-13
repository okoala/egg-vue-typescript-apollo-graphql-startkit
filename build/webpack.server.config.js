const path = require('path')
const webpack = require('webpack')
const externals = require('webpack-node-externals')
const base = require('./webpack.base.config')

const resolve = file => path.resolve(__dirname, file)

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: null,
  entry: resolve('../src/server-entry.ts'),
  output: Object.assign({}, base.output, {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  }),
  externals: [externals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})
