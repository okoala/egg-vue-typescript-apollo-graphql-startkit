const fs = require('fs')
const path = require('path')
const deepmerge = require('deepmerge')

module.exports = appInfo => {
  const exports = {}

  exports.keys = 'awesome'

  exports.projectKey = 'CP_GOOD_PROJECT'

  exports.development = {
    watchDirs: ['app', 'config', 'conf', 'index.js']
  }

  // favicon.ico
  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.ico'))
  }

  // 静态目录配置
  exports.multipleStatic = [{
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'dist/')
  }, {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  }]

  // 安全控制
  exports.security = {
    csrf: {
      enable: false
    }
  }

  // 模板试图配置
  exports.view = {
    ext: 'tpl',
    cache: true
  }

  // 对日志进行切割
  exports.logrotator = {
    filesRotateBySize: [], // 需要按大小切割的文件，其他日志文件仍按照通常方式切割
    maxFileSize: 1 * 1024 * 1024, // 限制单个日志最大文件为1M，这是因为UAE上面显示最多只能是1M大小的数据
    maxFiles: 10, // 按大小切割时，文件最大切割的分数
    maxDays: 31, // 默认保存一个月的数据
    rotateDuration: 60000 // 按大小切割时，文件扫描的间隔时间
  }

  // 配置语言国际化
  exports.i18n = {
    // 默认语言，默认 "en-US"
    defaultLocale: 'zh-CN',
    // URL 参数，默认 "locale"
    queryField: 'locale',
    // Cookie 记录的 key, 默认："locale"
    cookieField: 'locale',
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y'
  }

  // exports.mysql = {
  //   // database configuration
  //   client: {
  //     host: '127.0.0.1',
  //     port: '3306',
  //     user: 'root',
  //     password: '123456',
  //     database: 'demo'
  //   },
  //   // load into app, default is open
  //   app: true,
  //   // load into agent, default is close
  //   agent: false
  // }

  exports.userservice = {
    service: {
      getUserId (ctx) {
        return ctx.user && ctx.user.uid
      },

      * getUser (ctx) {
        if (!ctx.state ||
            !ctx.state.user ||
            !ctx.state.user.id ||
            !ctx.state.user.user) {
          return null
        }
        return {
          uid: ctx.state.user.id,
          name: ctx.state.user.user
        }
      }
    }
  }

  // json web token
  // 所有的使用和配置信息在这：
  // https://github.com/koajs/jwt/blob/master/README.md
  // https://github.com/auth0/node-jsonwebtoken
  exports.jwt = {
    secret: 'cool-jobs',
    option: {
      expiresIn: '1d'
    }
  }

  exports.bodyParser = {
    formLimit: '1024kb',
    jsonLimit: '1024kb'
  }

  exports.mockUser = {
    id: 1,
    name: 'okoala',
    pwd: '6bffd3ecac362000da68feba6ddacca6'
  }

  return deepmerge(exports, require('../conf/config.json'))
}

