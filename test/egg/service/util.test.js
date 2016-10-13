/* global describe, it, expect, before, after, afterEach */

const assert = require('power-assert')
const mm = require('egg-mock')

describe('test/app/service/util.test.js', () => {
  let app
  let ctx
  before(() => {
    app = mm.app()
    ctx = app.mockContext()
    return app.ready()
  })

  after(() => app.close())

  afterEach(mm.restore)

  it('should getLocale use default', function () {
    const locale = ctx.service.util.getLocale()
    assert(locale.submit === '确定')
  })

  it('should getLocale use en-US', function () {
    const locale = ctx.service.util.getLocale('en-us')
    assert(locale.submit === 'Submit')
  })

  it('should locale are all the same length', function () {
    const localeEn = ctx.service.util.getLocale('en-us')
    const localeZh = ctx.service.util.getLocale('zh-cn')
    assert(Object.keys(localeEn).length === Object.keys(localeZh).length)
  })

  it('should gettext use default', function () {
    assert(ctx.gettext('error_not_exist_%s', '用户') === '没有此用户!')
  })

  it('checkMD5 if argument length less than 2 should return false', function () {
    const ret = ctx.service.util.checkMD5('ddd')
    assert(ret === false)
  })

  it('checkMD5 check Number type', function () {
    const ret = ctx.service.util.checkMD5(1, 'c4ca4238a0b923820dcc509a6f75849b')
    assert(ret === true)
  })

  it('checkMD5 check String type', function () {
    const ret = ctx.service.util.checkMD5('ss', '3691308f2a4c2f6983f2880d32e29c84')
    assert(ret === true)
  })

  it('checkMD5 check Array type', function () {
    const ret = ctx.service.util.checkMD5(['s', 's'], '3691308f2a4c2f6983f2880d32e29c84')
    assert(ret === true)
  })

  it('checkMD5 conver args to lowerCase to compare', function () {
    const ret = ctx.service.util.checkMD5(['okoala', 'CP_GOOD_PROJECT', '123456'], '6BFFD3ECAC362000DA68FEBA6DDACCA6')
    assert(ret === true)
  })

  it('getMD5 should support single args', function () {
    const ret = ctx.service.util.getMD5('ss')
    assert(ret === '3691308f2a4c2f6983f2880d32e29c84')
  })

  it('getMD5 should support multi args', function () {
    const ret = ctx.service.util.getMD5('s', 's')
    assert(ret === '3691308f2a4c2f6983f2880d32e29c84')
  })

  it('status should have right default msg', function () {
    const ret = ctx.service.util.status('success')
    assert(ret.code === 0)
    assert(ret.msg === '成功!')
  })

  it('status should get right msg', function () {
    const ret = ctx.service.util.status('error', 'some thing')
    assert(ret.code === 1000)
    assert(ret.msg === 'some thing错误!')
  })

  it('status should support locale', function () {
    const ret = ctx.service.util.status('error', 'profile_user')
    assert(ret.code === 1000)
    assert(ret.msg === '用户名错误!')
  })

  it('status defaultName should work', function () {
    const ret = ctx.service.util.status('user_not_exist')
    assert(ret.code === 1001)
    assert(ret.msg === '没有此用户名!')
  })

  it('status should support array msg', function () {
    const ret = ctx.service.util.status('error', ['profile_user', 'profile_pwd'])
    assert(ret.code === 1000)
    assert(ret.msg === '用户名或密码错误!')
  })
})
