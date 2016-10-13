// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
module.exports = {
  'default e2e tests': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementVisible('.layout', 5000)
      .assert.elementCount('.ad-series', 1)
      .end()
  }
}
