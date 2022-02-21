import axios from 'axios'

import { getToken } from '../storages/userStorage'

export default class HttpClient {
  static client = axios.create({
      baseURL: 'https://chat.crmdemo.net/api/v1',
      responseType: 'json',
      headers: {
          Accept: 'application/json'
      }
  });

  static get(url, config) {
      return HttpClient.client.get(url, config)
  }
  static post(url, payload) {
      return HttpClient.client.post(url, payload)
  }

  static put(url, payload) {
      return HttpClient.client.put(url, payload)
  }

  static delete(url) {
      return HttpClient.client.delete(url)
  }
}

HttpClient.client.interceptors.request.use(
    (config) => {

        const token = getToken()

        if (config?.url) {
            if (token && token.length > 0) {
                config.headers.authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

HttpClient.client.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const originalRequest = error.config
        if (!error.response) {
            return Promise.reject('Network Error')
        } else if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            return error.response
        } else {
            return error.response
        }
    }
)
