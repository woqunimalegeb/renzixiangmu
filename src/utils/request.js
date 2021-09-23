import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
const timeout = 60 * 60 * 1000
// 创建了一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    // 判断token是否过期
    // 1.存token的时候，顺便存一个时间戳
    // 2.发请求的时候，拿到当前时间戳
    // 3.发请求的时间戳-存token的时间戳>=我们约定的过期时间
    // 4，如果过期了，就退出
    if (isCheckTimeOut()) {
      store.commit('user/lo9out')
      router.push('login')
      return Promise.reject(new Error('登录过期'))
    }
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(({ data }) => {
  const { data: res, success, message } = data
  if (success) return res
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  if (error.response && error.response.status === 401) {
    store.comit('user/logout')
    router.push('/login')
    Message.error('登录过期')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
// 检查时间戳过期
function isCheckTimeOut() {
  const currentDate = Date.now()
  const tokenTime = getTokenTime()
  return (currentDate - tokenTime) >= timeout
}
export default service
