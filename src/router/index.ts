import * as Vue from 'vue'
import auth from '../service/auth'

const Router = require('vue-router')

const Index = require('../views/Index.vue')
const Login = require('../views/Login.vue')
const Home = require('../views/Home.vue')

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index,
      children: [
        { path: 'login', component: Login, meta: { standalone: true }},
        { path: 'logout',
          beforeEnter (to, from, next) {
            auth.logout()
            next('/login')
          }
        },
        {
          path: 'home', component: Home, beforeEnter: requireAuth
        },
        { path: '', redirect: 'home' }
      ]
    }
  ]
})
