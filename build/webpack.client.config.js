const path = require('path')
const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const base = require('./webpack.base.config')
const projectConfig = require('../conf/config.json')

// extract CSS into a single file so it's applied on initial render
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: []
})

if (process.env.NODE_ENV === 'development') {
  const open = require('open')
  // setup on the fly compilation + hot-reload
  config.devtool = 'eval'
  config.entry.app = [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://127.0.0.1:${projectConfig.webpackDevPort}`,
    config.entry.app
  ]
  config.output.publicPath = `http://127.0.0.1:${projectConfig.webpackDevPort}/dist/`
  config.devServer = {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    stats: {
      progress: true,
      colors: true,
      assets: true,
      version: true,
      hash: true,
      timings: true,
      chunks: false,
      chunkModules: false
    },
    historyApiFallback: true,
    proxy: {
      '**': {
        target: `http://127.0.0.1:${projectConfig.port}`,
        secure: false
      }
    }
  }
  config.plugins.push(
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'NODE_PORT': JSON.stringify(projectConfig.webpackDevPort)
      }
    }),
    new ExtractTextPlugin('style.css'),
    new NpmInstallPlugin({
      // Use --save or --save-dev
      dev: false,
      // Install missing peerDependencies
      peerDependencies: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-bundle.js'
    })
  )
  setTimeout(() => {
    open(`http://127.0.0.1:${projectConfig.webpackDevPort}`)
  }, 2000)
} else {
  const AssetsPlugin = require('assets-webpack-plugin')
  const PrerenderSpaPlugin = require('prerender-spa-plugin')

  config.vue.loaders = {
    less: ExtractTextPlugin.extract('css!less')
  }

  config.output.filename = '[name]-bundle-[hash].js'

  config.plugins.push(
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('styles-[contenthash].css'),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name]-bundle-[hash].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new PrerenderSpaPlugin(
      path.join(__dirname, '..', 'dist'),
      ['/login'],
      {
        captureAfterTime: 5000,
        maxAttempts: 10,
        phantomOptions: '--disk-cache=true',
        phantomPageSettings: {
          loadImages: true
        }
      }
    ),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, '../dist')
    })
  )
}

module.exports = config
