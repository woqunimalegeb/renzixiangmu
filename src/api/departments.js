import request from '@/utils/request'

/**
 * 查询企业的部门列表
 * @returns
 */
export function getDepartment() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

/**
 * 根据ID删除部门
 * @param {*} id
 * @returns
 */
export function delDeptById(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @returns
 */
export function getIncreased(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 根据ID修改部门详情
 * @param {*} data
 * @returns
 */
export function updateDepartment(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
