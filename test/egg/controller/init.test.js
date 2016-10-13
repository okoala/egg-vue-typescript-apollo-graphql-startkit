/* global describe, it, expect, before, after, afterEach */

const mm = require('egg-mock')

let app
before(() => {
  app = mm.app()
  return app.ready()
})

after(() => app.close())

afterEach(mm.restore)
