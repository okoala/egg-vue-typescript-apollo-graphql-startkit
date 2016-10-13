// we can just use the exact same webpack config by requiring it
// but make sure to delete the normal entry
var webpackConf = require('../../build/webpack.base.config')
delete webpackConf.entry

// 单元测试中使用standalone版本的vue
webpackConf.resolve.alias.vue = 'vue/dist/vue.js'

// shared config for all unit tests
module.exports = {
  frameworks: ['jasmine'],
  // this is the entry file for all our tests.
  files: [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.js',
    './index.js'
  ],
  // we will pass the entry file to webpack for bundling.
  preprocessors: {
    './index.js': ['webpack']
  },
  webpack: webpackConf,
  webpackMiddleware: {
    noInfo: true
  }
}
