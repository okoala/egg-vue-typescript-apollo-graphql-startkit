const config = require('./config/config.default')

require('egg').startCluster({
  baseDir: __dirname,
  port: config.port,
  workers: process.env.PORT || config.workers
})
