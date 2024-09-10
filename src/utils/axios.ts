import axios, { AxiosError } from 'axios'
import config from 'config'
import { OptionsObject, enqueueSnackbar } from 'notistack'
import { removeToken } from './token'

const http = axios.create({ baseURL: config.baseUrl })

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    const options: OptionsObject = { variant: 'warning' }
    if (error.code === 'ERR_NETWORK') {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    if (error.response) {
      const { status, data } = error.response
      const pathname = location.pathname
      if (status === 500) {
        options.variant = 'error'
      } else if (status === 401) {
        removeToken()
        if (!pathname.startsWith('/auth')) window.location.href = '/auth'
      }
      enqueueSnackbar((data && data.detail) || '', options)
    }
    return Promise.reject(error)
  }
)

export class HttpService {
  static async get(url: string, params: object = {}) {
    return await http.get(url, { params })
  }

  static async post(url: string, body: object, params: object = {}) {
    return await http.post(url, body, { params })
  }

  static async put(url: string, data: object, params: object = {}) {
    return await http.put(url, data, { params })
  }

  static async delete(url: string, params: object = {}) {
    return await http.delete(url, { params })
  }

  static thirdPartyAPI() {
    return axios
  }
}
