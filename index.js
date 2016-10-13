process.env.VUE_ENV = 'server'
const os = require('os')
const config = require('./conf/config.json')

require('egg').startCluster({
  baseDir: __dirname,
  port: config.port,
  workers: process.env.NODE_ENV === 'development' ? 1 : os.cpus().length
})
