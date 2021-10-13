import request from '@/utils/request'

/**
 * 获取所有权限
 * @returns
 */
export function getPermissionList() {
  return request({
    url: '/sys/permission',
    method: 'GET'
  })
}

/**
 * 添加权限点
 * @returns
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 * 根据ID获取权限点详情
 * @returns
 */
export function getPermissionInfo(id) {
  return request({
    url: '/sys/permission/' + id,
    method: 'GET'
  })
}

/**
 * 根据ID更新权限点详情
 * @returns
 */
export function editPermissionInfo(data) {
  return request({
    url: '/sys/permission/' + data.id,
    method: 'PUT',
    data
  })
}
/**
 * 根据id删除权限点
 * @returns
 */
export function PermissionDelete(id) {
  return request({
    url: '/sys/permission/' + id,
    method: 'DELETE'
  })
}

export function setPermissionToRole(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
