import axios from 'axios'
import Cookies from 'universal-cookie'

export default class HttpAuthClient {
  static client = axios.create({
      baseURL: 'https://projectapi.crmdemo.net',
      responseType: 'json',
      headers: {
          Accept: 'application/json'
      }
  });

  static get(url, config) {
      return HttpAuthClient.client.get(url, config)
  }
  static post(url, payload) {
      return HttpAuthClient.client.post(url, payload)
  }

  static put(url, payload) {
      return HttpAuthClient.client.put(url, payload)
  }

  static delete(url) {
      return HttpAuthClient.client.delete(url)
  }
}

HttpAuthClient.client.interceptors.request.use(
    (config) => {
        const cookies = new Cookies()
        if (config?.url) {
            const token = cookies.get('abizin_token')
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

HttpAuthClient.client.interceptors.response.use(
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
