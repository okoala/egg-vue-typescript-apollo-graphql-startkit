const _ = require('lodash')

module.exports = app => {
  /**
   * AD Service
   */
  class accountService extends app.Service {

    constructor (ctx) {
      super(ctx)
      this.app = ctx.app
      this.__ = this.ctx.__.bind(this.ctx)
      this.status = ctx.service.util.status.bind(ctx.service.util)
      this.getMD5 = ctx.service.util.getMD5
      this.checkMD5 = ctx.service.util.checkMD5
      this.mockUser = ctx.app.config.mockUser
    }

    * checkUserExist (user) {
      return user === this.mockUser.name
    }

    /**
     * 检查登录状态
     *
     * @param {String} user 用户名
     * @param {String} pwd 密码
     * @returns
     *
     * @memberOf accountService
     */
    * checkLogin (user, pwd) {
      const key = this.app.config.projectKey
      const res = user === this.mockUser.name && this.mockUser

      if (!res) {
        return this.status('user_not_exist')
      }

      if (!this.checkMD5([user, key, pwd], res.pwd)) {
        return this.status('error', 'profile_pwd')
      }

      return this.status('success', res, 'login')
    }


    /**
     * 执行登录
     *
     * @param {String} user 用户名
     * @param {String} pwd 密码
     *
     * @memberOf accountService
     */
    * doLogin (user, pwd) {
      return yield this.checkLogin(user, pwd)
    }

    /**
     * 获取所有的用户数据
     *
     * @memberOf accountService
     */
    * getUser (user) {
      const __ = this.__
      const row = this.mockUser.name === user && this.mockUser

      if (!row) {
        return this.status('user_not_exist')
      }

      return this.status('success', row, 'get_user')
    }
  }

  return accountService
}
