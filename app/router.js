module.exports = app => {
  app.post('/graphql', app.jwt, app.controller.graphql)

  // 如果是开发环境，可以开启graphiql
  if (process.env.NODE_ENV === 'development') {
    app.get('/graphiql', app.controller.graphiql)
  }

  // 登录不适用graphql，因为graphql要进行jwt验证
  app.post('/api/login', app.controller.login)

  // 除了前面的路由和静态文件路由之外，所有的请求都跳到render，使用vue-router进行前端路由页面管理
  app.get('*', app.controller.render)
}
