import axios from 'axios'
import RequestType from './type'
import getToken from '../utils/getToken'
import { showNotify } from 'vant';
import { router } from "@/router"

const request = axios.create({
  baseURL: '/mock',
  timeout: 10000
})

request.interceptors.request.use((config: any) => {
  if (getToken()) {
    config.headers.token = getToken()
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, (err: any) => {
  return Promise.reject(err)
})

request.interceptors.response.use((res: any) => {
  return res.data
}, (err: any) => {
  if (err.response.status === 401) {
    showNotify({ type: 'warning', message: '登录凭证过期' });
    router.push({ name: 'login' })
  }
  return Promise.reject(err)
})

export default ({ url, method = 'get', params, data,
  headers = {} }: RequestType) => {
  return request({
    url,
    method,
    params,
    data,
    headers
  })
}

