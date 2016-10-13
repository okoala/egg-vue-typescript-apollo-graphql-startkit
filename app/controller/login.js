module.exports = function * loginController () {
  const fields = this.request.body
  const status = this.service.util.status
  const jwt = this.app.jwt
  const token = fields.token
  const secret = this.app.config.jwt.secret
  const option = this.app.config.jwt.option

  // if (token) {
  //   return jwt.verify(token, secret, (err, decoded) => {
  //     if (err) {
  //       this.body = status('error', 'token_invalid')
  //     }
  //     this.body = status('success', decoded, 'login')
  //   })
  // }

  const loginStatus = yield this.service.account.doLogin(fields.user, fields.pwd)

  let user = null
  // 先判断是否存在data，有些错误的情况下没返回data对象
  if (loginStatus.data) {
    const data = loginStatus.data
    user = {
      id: data.id,
      name: data.name
    }
    loginStatus.data = user
  }

  // 如果登录是成功是，则保存用户数据到session里面
  if (loginStatus.code === 0) {
    // todo: 目前只是简单的加密，之后看看jwt配置，有没有更好的加密方式。
    loginStatus.token = jwt.sign(user, secret, option)
  }

  this.body = loginStatus
}
