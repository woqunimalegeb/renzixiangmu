import request from '@/utils/request'

export const getRolesList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 根据ID删除角色
 * @param {*} params
 * @returns
 */
export const DELETERoles = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}

/**
 * 根据ID获取角色详情
 * @param {*} params
 * @returns
 */
export const getRolesById = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}

/**
 * 根据ID更新角色
 * @param {*} params
 * @returns
 */
export const getByIdUpdate = (data) => {
  return request({
    url: '/sys/role/' + data.id,
    method: 'PUT',
    data
  })
}

/**
 * 添加角色
 * @param {*} params
 * @returns
 */
export const addRoles = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 查询全部企业列表
 * @param {*} params
 * @returns
 */
export const companyAll = () => {
  return request({
    url: '/company',
    method: 'GET'
  })
}
