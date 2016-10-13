// const { Kind } = require('graphql/language')
const co = require('co')

const resolvers = {
  // Date: {
  //   __parseValue (value) {
  //     return new Date(value) // value from the client
  //   },
  //   __serialize (value) {
  //     return value.getTime() // value sent to the client
  //   },
  //   __parseLiteral (ast) {
  //     if (ast.kind === Kind.INT) {
  //       return parseInt(ast.value, 10) // ast value is always in string format
  //     }
  //     return null
  //   }
  // },
  Query: {
    /**
     * 获取用户信息
     *
     * @param {any} root
     * @param {any} { fields }
     * @param {any} { ctx }
     * @returns
     */
    getUser (root, { fields }, { ctx, user, status, __ }) {
      return co(function * () {
        const name = user.name
        const usersStatus = yield ctx.service.account.getUser(name)

        if (usersStatus.code !== 0) {
          return usersStatus
        }
        return status('success', usersStatus.data, 'get_user')
      }).catch((e) => {
        console.error(e)
        return e
      })
    }
  }
}

module.exports = resolvers
