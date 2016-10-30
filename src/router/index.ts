import * as Vue from 'vue'
import { loggedIn, logout } from '../service/auth'
import { __ } from '../service/locale'

const Router = require('vue-router')

const Index = require('../views/Index.vue')
const Login = require('../views/Login.vue')
const Home = require('../views/Home.vue')

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!loggedIn()) {
    next({
      path: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index,
      children: [
        { path: 'login', component: Login, meta: { standalone: true, title: __('login') }},
        { path: 'logout',
          beforeEnter (to, from, next) {
            logout()
            next('/login')
          }
        },
        {
          path: 'home', component: Home, beforeEnter: requireAuth, meta: { title: __('home') }
        },
        { path: '', redirect: 'home' }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
