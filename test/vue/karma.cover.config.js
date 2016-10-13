const base = require('./karma.base.config')

module.exports = function (config) {
  var options = Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    singleRun: true
  })

  config.set(options)
}
