import axios from 'axios'
import { Message } from 'element-ui'
// 创建了一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use(({ data }) => {
  const { data: res, success, message } = data
  if (success) return res
  Message.error(message)
  return Promise.reject(new Error(message))
},

error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
