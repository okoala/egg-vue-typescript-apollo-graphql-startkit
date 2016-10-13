const { graphiqlKoa } = require('apollo-server')

module.exports = function * graphiqlController () {
  graphiqlKoa({ endpointURL: '/graphql' })(this)
}
