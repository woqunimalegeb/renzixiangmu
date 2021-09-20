import request from '@/utils/request'

export function login(data) {
  return request({
    URL: 'http//localhost:8888/api/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {}

export function logout() {}
