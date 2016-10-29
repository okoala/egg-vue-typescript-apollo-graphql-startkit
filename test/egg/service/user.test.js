/* global describe, it, expect, before, after, afterEach */

const assert = require('power-assert')
const mm = require('egg-mock')

describe('test/app/service/user.test.js', () => {
  let app
  let ctx
  before(() => {
    app = mm.app()
    ctx = app.mockContext()
    return app.ready()
  })

  after(() => app.close())

  afterEach(mm.restore)

  it('should return error if not user', function () {
    const status = ctx.service.user.getUser('chaoo')
    assert(status.code !== 0)
  })
})
