import axios from 'axios'
// 创建了一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use()

export default service
