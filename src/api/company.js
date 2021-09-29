import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

export function delRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}

export function getRoleById(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'GET'
  })
}

export function updateRole(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'PUT',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
