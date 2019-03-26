/*
 * @Author: jhd
 * @Date: 2019-01-14 16:40:52
 * @Description: axios config file
 */
import axios from 'axios'
import app from '../main'

// const ajaxconfig =
const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api',
  timeout: 1e5
})
// 拦截器
ajax.interceptors.request.use((config: any) => {
  config.params = {
    ...config.params
  }
  config.headers = {
    token: window.localStorage.getItem('AGENCY_TOKEN'),
    access_token: window.localStorage.getItem('AGENCY_TOKEN')
  }
  return config
}, (error: string) => {
  return Promise.reject(error)
})

ajax.interceptors.response.use((response: any) => {
    switch (response.status) {
      case 500:
        app.$message({
          message: response.data.message,
          type: 'error'
        })
        break
      default:
        break
    }
    return response.data
  },
  (error: any) => {
    app.$message({
      message: error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default ajax
