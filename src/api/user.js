import request from '@/utils/request'

/**
 * 登录请求
 * @param {*} data
 * @returns
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 *
 * @returns 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 根据上面接口获取用户信息的Id来获取详细信息
 * @param {*} id
 * @returns
 */
export function getInfoById(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'GET'
  })
}
export function logout() {

}

/**
 * 更改员工详细信息
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function updateInfo(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}
