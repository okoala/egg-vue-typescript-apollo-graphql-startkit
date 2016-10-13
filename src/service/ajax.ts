import axios from 'axios'
import { __ } from './locale'

axios.interceptors.response.use(function (response) {
  if (response.status === 200 && response.statusText === 'OK') {
    const body = response.data
    if (body.code === 0) {
      return Promise.resolve(body)
    } else {
      return Promise.reject(body.msg)
    }
  } else {
    return Promise.reject(__('error%s', __('server')))
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
})

export default axios
