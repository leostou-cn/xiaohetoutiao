import axios from 'axios'
import RequestType from './type'
import getToken from '../utils/getToken'
import { Notify } from 'vant';
import { router } from "@/router"

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
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
    router.push({ name: 'login' })
    Notify({ type: 'warning', message: '身份失效' })
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

