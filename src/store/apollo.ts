import * as Vue from 'vue'
import gql from 'graphql-tag'

import { trackLog } from '../service/util'
import { getToken, logout } from '../service/auth'

// apollo的声明文件各种报错，用require引入
const ApolloClient = require('apollo-client')

let apolloClient

export default {
  init () {
    const options = {} as any
    let url = '/graphql'
    if (process.env.NODE_ENV === 'development') {
      options.ssrMode = false
      url = `http://127.0.0.1:${process.env.NODE_PORT}/graphql`
    } else {
      options.ssrForceFetchDelay = 100
    }

    const networkInterface = ApolloClient.createNetworkInterface(url, { credentials: 'same-origin', transportBatching: true })

    networkInterface.use([
      {
        // 在发起grapql请求的前要设置token
        applyMiddleware(req, next) {
          if (!req.options.headers) {
            req.options.headers = {}
          }
          req.options.headers.Authorization = 'Bearer ' + getToken()
          next()
        }
      }
    ])

    networkInterface.useAfter([
      {
        // 如果没有登录，则跳转到登录界面，如果成功之后就再跳转回来。
        applyAfterware({ response }, next) {
          if (response.status === 401) {
            logout()
              .then(res => {
                document.location.href = '/login' + '?redirect=' + encodeURIComponent(document.location.href)
              })
          }
          next()
        }
      }
    ])

    apolloClient = (<any>window).__APOLLO_CLIENT__ = new ApolloClient.default(Object.assign(
      {
        networkInterface,
        shouldBatch: true,
        queryTransformer: ApolloClient.addTypename
      },
      options
    ))

    trackLog('init graphql')
  },
  get apollo () {
    return apolloClient
  },
  get gql () {
    return gql
  }
}
