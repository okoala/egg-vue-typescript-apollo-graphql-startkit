import * as Vue from 'vue'
const Vuex = require('vuex')

import account from './modules/account'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    user
  },
  getters: {
    version () {
      return (<any>window)._PROJECT.version
    },
    userInfo () {
      return JSON.parse((<any>window).localStorage.userInfo || {})
    }
  }
})

export default store
