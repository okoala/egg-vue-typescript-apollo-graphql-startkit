// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// import all helpers
const helpersContext = require.context('./helpers', true)
helpersContext.keys().forEach(helpersContext)

// require all test files (files that ends with .test.js)
var testsContext = require.context('./', true, /\.test$/)
testsContext.keys().forEach(testsContext)
