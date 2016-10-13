import * as Vue from 'vue'
import Apollo from '../apollo'

const apollo = Apollo.apollo
const gql = Apollo.gql

export default {
  state: {
    user: {}
  },
  actions: {
    GET_USER: ({ commit }, fields = {}) => {
      return apollo.query({
        query: gql`
          query User($fields: GetUserInput) {
            getUser(fields: $fields) {
              code,
              data {
                id,
                name
              },
              msg
            },
          }
        `,
        variables: {
          fields
        },
        forceFetch: true
      }).then(res => {
        const ret = res.data.getUser
        if (ret.code === 0) {
          commit('SET_USER', ret.data)
          return ret.data
        } else {
          Promise.reject(ret.msg)
        }
      })
    }
  },
  mutations: {
    SET_USER: (state, data) => {
      state.user = data
    }
  }
}
