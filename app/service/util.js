const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

module.exports = app => {
  let LocaleResources

  /**
   * utilService
   */
  class utilService extends app.Service {

    constructor (ctx) {
      super(ctx)

      if (!LocaleResources) {
        LocaleResources = this.getLocaleResource()
      }

      this.__ = this.ctx.__.bind(this.ctx)
    }

    /**
     * 获取国际化语言信息
     *
     * @param {String} locale
     * @returns
     *
     * @memberOf utilService
     */
    getLocale (locale) {
      locale = locale || this.ctx.__getLocale()
      return LocaleResources[locale]
    }

    getLocaleResource () {
      const resources = {}
      const localeDir = app.config.i18n.dir
      const localeDirs = app.config.i18n.dirs

      if (localeDir && localeDirs.indexOf(localeDir) === -1) {
        localeDirs.push(localeDir)
      }

      for (let i = 0; i < localeDirs.length; i++) {
        const dir = localeDirs[i]

        if (!fs.existsSync(dir)) {
          continue
        }

        const names = fs.readdirSync(dir)
        for (let j = 0; j < names.length; j++) {
          const name = names[j]
          const filepath = path.join(dir, name)
          // support en_US.js => en-US.js
          const locale = this.formatLocale(name.split('.')[0])
          let resource = {}

          if (name.endsWith('.js') || name.endsWith('.json')) {
            resource = this.flattening(require(filepath))
          }

          resources[locale] = resources[locale] || {}
          Object.assign(resources[locale], resource)
        }
      }
      return resources
    }

    isObject (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]'
    }

    formatLocale (locale) {
      // support zh_CN, en_US => zh-CN, en-US
      return locale.replace('_', '-').toLowerCase()
    }

    flattening (data) {
      const self = this
      const result = {}

      function deepFlat (data, keys) {
        Object.keys(data).forEach(function (key) {
          const value = data[key]
          const k = keys ? keys + '.' + key : key
          if (self.isObject(value)) {
            deepFlat(value, k)
          } else {
            result[k] = String(value)
          }
        })
      }

      deepFlat(data, '')

      return result
    }

    /**
     * 检查参数1产生的MD5是否和给定值是一直的
     *
     * @param {any} arg1
     * @param {any} md5
     * @returns
     *
     * @memberOf utilService
     */
    checkMD5 (arg1, md5) {
      if (arguments.length < 2) {
        return false
      }
      let checkStr = ''
      if (Array.isArray(arg1)) {
        checkStr = arg1.map(item => String(item)).join('')
      } else {
        checkStr = String(arg1)
      }

      // 全部转换成小写来比较
      return this.getMD5(checkStr).toLowerCase() === md5.toLowerCase()
    }

    /**
     * 根据参数生产验证码
     *
     * @param {any} args
     * @returns
     *
     * @memberOf utilService
     */
    getMD5 (...args) {
      const str = args.map(v => String(v)).join('')
      return crypto.createHash('md5').update(str).digest('hex')
    }

    /**
     * 获取结果状态信息
     * 结果包含 code 和 msg
     *
     * @param {String} key
     * @param {String} msg
     * @returns {Object}
     *
     * @memberOf utilService
     */
    getStatus (key, msg) {
      const statusMap = {
        'success': {
          code: 0,
          msg: 'success%s'
        },
        'error': {
          code: 1000,
          msg: 'error%s'
        },
        'user_not_exist': {
          code: 1001,
          defaultName: 'profile_user',
          msg: 'error_not_exist_%s'
        },
        'pwd_error': {
          code: 1002,
          defaultName: 'profile_pwd',
          msg: 'error%s'
        },
        'user_is_exist': {
          code: 1003,
          defaultName: 'profile_user',
          msg: 'error_is_exist_%s'
        },
        'permission_invalid': {
          code: 1004,
          msg: 'permission_invalid'
        }
      }

      const currentStatus = statusMap[key]

      if (!currentStatus) {
        const success = statusMap['success']
        success.msg = this.__(success.msg)
        return success
      }

      if (!msg) {
        msg = currentStatus.defaultName ? this.__(currentStatus.defaultName) : ''
      }

      if (Array.isArray(msg)) {
        msg = msg.map(v => this.__(v)).join(this.__('or'))
      } else {
        msg = this.__(msg)
      }

      currentStatus.msg = this.__(currentStatus.msg, msg)
      return currentStatus
    }

    /**
     * 统一数据状态信息
     * 结果返回对象： { code, data, msg }
     *
     * @param {String} type
     * @param {any} data
     * @param {String} msg
     * @returns
     *
     * @memberOf utilService
     */
    status (type, data, msg) {
      if (arguments.length === 2) {
        msg = data
        data = null
      }
      const status = this.getStatus(type, msg)
      status.data = data
      return status
    }
  }

  return utilService
}
