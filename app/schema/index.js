const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('../resolver')
const userSchema = require('./user')


const schema = `
input QueryBuilder {
  orderName: String
  orderType: String
  limit: Int
  offset: Int
}

type Query {
  getUser(fields: GetUserInput): GetUserOutput
}
schema {
  query: Query
}
`

module.exports = makeExecutableSchema({
  typeDefs: [
    schema,
    userSchema
  ],
  resolvers
})
