import ajax from './ajax'

export default {
  login (user, pwd) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token')) {
        return resolve(true)
      }

      ajax.post('/api/login', {
        user,
        pwd
      })
      .then(body => {
        localStorage.setItem('token', (<any>body).token)
        localStorage.setItem('userInfo', JSON.stringify(body.data || {}))
        resolve(body.data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },

  getToken () {
    return localStorage.getItem('token')
  },

  logout () {
    return new Promise((resolve, reject) => {
      delete localStorage['token']
      if (resolve) resolve(true)
      this.onChange(false)
    })
  },

  loggedIn () {
    return !!localStorage.getItem('token')
  }
}
