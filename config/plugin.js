exports.static = false
exports.logrotator = true
exports.i18n = true
exports.development = false
exports.session = true
exports.userservice = true
exports.userrole = false
exports.view = {
  enable: true,
  package: 'egg-view-nunjucks'
}

exports.mysql = {
  enable: false,
  package: 'egg-knex'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.multipleStatic = {
  enable: true,
  package: 'egg-multiple-static'
}
