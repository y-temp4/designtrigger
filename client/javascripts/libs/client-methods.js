/* eslint no-param-reassign: 0 */

import ReactOnRails from 'react-on-rails'
import axios from 'axios'

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    config.headers['X-CSRF-TOKEN'] = ReactOnRails.authenticityToken()
    return config
  },
  error => Promise.reject(error),
)

export function sendDelete(url) {
  return axios.delete(url).then(response => response.data)
}

export function sendPatch(url, data) {
  return axios.patch(url, data).then(response => response.data)
}

export function sendPost(url, data) {
  return axios.post(url, data).then(response => response.data)
}
