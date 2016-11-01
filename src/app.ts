import * as Vue from 'vue'
import { __ } from './service/locale'

require('semantic-ui-icon/icon.css')

/** 组件相关 */
import { Form, FormItem, Input, Button } from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

/** 把所有的组件都初始化，挂在在全局上 */
import Components from './components'
Vue.use(Components)

// 设置语言国际化
Vue.use(() => {
  Vue.mixin({
    created () {
      (<any>this).__ = __
    },
    destroyed () {
      (<any>this).__ = null
    }
  })
})

// 初始话apollo，缓存apollo实例
import apollo from './store/apollo'
apollo.init()

import { toUpperCase, toLowerCase } from './service/util'
import { dateFormat } from './service/date'
Vue.filter('toUpperCase', toUpperCase)
Vue.filter('toLowerCase', toLowerCase)
Vue.filter('dateFormat', dateFormat)

// Vue相关：路由，store
import store from './store'
import router from './router'
const { sync } = require('vuex-router-sync')
const App = require('./views/App.vue')

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue(Object.assign({
  router,
  store
}, App)) // Object spread copying everything from App.vue

// expose the app, the router and the store.
// note we not mounting the app here, since bootstrapping will be
// different depending on whether we are in browser or on the server.
export { app, router, store }
