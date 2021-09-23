import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_token'
const TokenTimeKey = 'token_time'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setTokenTime() {
  Cookies.set(TokenTimeKey, Date.now())
}
export function getTokenTime() {
  return Cookies.get(TokenTimeKey)
}
