// 存到到本地的一个Cookies库
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-token'
const TokenTimeKey = 'token-time'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 封装时间的方法保存到本地
export function setTokenTime() {
  Cookies.set(TokenTimeKey, Date.now())
}
// 封装时间的方法从本地获取
export function getTokenTime() {
  return Cookies.get(TokenTimeKey)
}

