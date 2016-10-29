/* eslint-disable no-extend-native */
// import all helpers
const helpersContext = require.context('./helpers', true)
helpersContext.keys().forEach(helpersContext)

// require all test files (files that ends with .test.js)
var testsContext = require.context('./', true, /\.test$/)
testsContext.keys().forEach(testsContext)
