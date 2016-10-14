const safeStringify = require('fast-safe-stringify')
const packageConf = require('../../package.json')

let assets = process.env.NODE_ENV !== 'development'
  ? require('../../dist/assets.json')
  : { app: { js: '/dist/app-bundle.js' }, vendor: { js: '/dist/vendor-bundle.js', css: '/dist/style.css' }}


/**
 * 获取资源文件，并分门归类。
 * 所有js在scripts对象下，css在styles对象下
 *
 * @param {Object} obj 由assets-webpack产生的资源对象
 * @returns {Object}
 */
function getFinalAssets (obj = {}) {
  const scripts = []
  const styles = []

  Object.keys(obj).sort((a, b) => {
    // 保证vendor永远在最前面
    if (b === 'vendor') {
      return 1
    } else {
      return 0
    }
  }).forEach(key => {
    const asset = obj[key]
    if (asset) {
      if (asset.js) {
        scripts.push(asset.js)
      }
      if (asset.css) {
        styles.push(asset.css)
      }
    }
  })

  return {
    scripts,
    styles
  }
}

assets = getFinalAssets(assets)

module.exports = function * renderController (useStr) {
  const locals = {
    assets,
    project: safeStringify({
      name: this.__('platform_name'),
      version: packageConf.version
    }),
    locale: safeStringify(this.service.util.getLocale() || '')
  }

  // 直接只返回编译好的模板文件，方便服务端同构渲染
  if (useStr && typeof useStr === 'boolean') {
    return yield this.renderView('layout.tpl', locals)
  }

  return yield this.render('layout.tpl', locals)
}
