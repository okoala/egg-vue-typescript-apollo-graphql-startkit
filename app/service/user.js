const _ = require('lodash')

module.exports = app => {
  /**
   * AD Service
   */
  class userService extends app.Service {

    constructor (ctx) {
      super(ctx)
      this.app = ctx.app
      this.__ = this.ctx.__.bind(this.ctx)
      this.status = ctx.service.util.status.bind(ctx.service.util)
      this.mockUser = ctx.app.config.mockUser
    }

    /**
     * 获取所有的用户数据
     *
     * @memberOf userService
     */
    * getUser (user) {
      const row = this.mockUser.name === user && this.mockUser

      if (!row) {
        return this.status('user_not_exist')
      }

      return this.status('success', row, 'get_user')
    }
  }

  return userService
}
