const base = require('./karma.base.config')

module.exports = function (config) {
  var options = Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['spec'],
    singleRun: true
  })

  config.set(options)
}
