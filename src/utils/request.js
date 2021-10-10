import axios from 'axios'
// 引入提示消息
import { Message } from 'element-ui'
// 引入store
import store from '@/store'

import router from '@/router'
// 引入TOKEN时间的方法
import { getTokenTime } from '@/utils/auth.js'
// 约定TOKEN过期时间
const timeout = 2 * 3600 * 1000

// 创建axios实例
const service = axios.create(
  // 利用.env.development和.env.production里面的VUE_APP_BASE_API来进行不同环境不同地址
  // process.env相当于开发环境，然后调用使用即可
  {
    baseURL: process.env.VUE_APP_BASE_API
  }
)

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    // 处理token过期
    if (isCheckTimeOut()) {
      // 跟退出登录操作一样，清除数据
      store.commit('user/logout')
      // 跳转页面
      router.push('/login')
      // 重新定义一个错误提示，失败后就会走响应拦截器的失败
      return Promise.reject(new Error('登录过期'))
    }
    // 有token的时候统一携带token
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(({ data }) => {
  const { data: res, success, message } = data
  // 发送请求成功，解构出去
  if (success) return res
  // 发送请求成功，但有错误，不是真正的成功，比如账号密码错误
  // 给错误提示
  Message.error(message)
  // 调用Promise.reject，不调用的话发送请求后代码还会往下面走,因为Promise返回一个对象，所以new一个
  return Promise.reject(new Error(message))
},
// 响应拦截器失败后
error => {
  // token过期的被动处理要在响应拦截器里面进行，判断error里面response
  if (error.response && error.response.status === 401) {
    // 跟退出登录操作一样，清除数据
    store.commit('user/logout')
    // 跳转页面
    router.push('/login')
    Message.error('登录过期')
  } else {
    // 统一加失败请求，catch可以删掉，报错但不影响
    Message.error(error.message)
  }

  // 调用Promise.reject，不调用的话发送请求后代码还会往下面走
  return Promise.reject(error)
})

// 检查token过期的处理方法
function isCheckTimeOut() {
  // 拿到现在的时间
  const currentTime = Date.now()
  // 拿到存token时的时间
  const tokenTime = getTokenTime()
  // 拿到差值看看大于还是小于约定的过期时间，返回布尔值
  return (currentTime - tokenTime) >= timeout
}

export default service
