/*
 * @Author: jhd
 * @Date: 2019-01-14 16:40:52
 * @Description: axios config file
 */
import axios from 'axios'
import app from '../main'
import { loginIn } from '../utils/logginIn'

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
    switch (response.data.code) {
      case -1:
        app.$message({
          message: response.data.message,
          type: 'warning'
        })
        app.$router.push({
          path: '/login',
          query: { redirect: app.$route.fullPath }
        })
        break
      case 500:
        app.$message({
          message: response.data.message,
          type: 'error'
        })
        break
      default:
        break
    }
    switch (response.status) {
      case 404:
        app.$router.push({
          path: '/404',
          query: { redirect: app.$route.fullPath }
        })
        break
      default:
        break
    }
    return response
  },
  (error: any) => {
    if (!loginIn) {
      app.$alert('用户信息已过期，请点击确定后重新登陆！', '提示', {
        confirmButtonText: '确定',
        callback: action => app.$router.push({
          path: '/login',
          query: { redirect: app.$route.fullPath }
        })
      })
    }
    return Promise.reject(error)
  }
)
export default ajax
