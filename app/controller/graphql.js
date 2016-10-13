const { apolloKoa } = require('apollo-server')
const schema = require('../schema')

module.exports = function * graphqlController () {
  yield apolloKoa({
    schema,
    context: {
      ctx: this,
      user: this.state && this.state.user,
      status: this.service.util.status.bind(this.service.util),
      __: this.__.bind(this)
    },
    allowUndefinedInResolve: false,
    printErrors: true
  })(this)
}
