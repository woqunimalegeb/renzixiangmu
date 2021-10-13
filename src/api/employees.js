import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns
 */
export function getEmployeesSimpleList() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

/**
 * 获取员工列表
 * @returns
 */
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

/**
 * 新增员工
 * @param {*} params
 * @returns
 */
export function addEmployees(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 批量导入员工
 * ****/

export function AddEmployeeAll(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

/** *
 *  获取某个用户的基本信息
 *
 * ***/
export function getEmployeeInfo(id) {
  return request({
    url: '/sys/user/' + id
  })
}

/** *
 *
 * 更新员工账号密码
 * **/
export function updateUserDetail(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取员工个人信息
 * @param {*} id
 * @returns
 */
export function getEmployeesDetail(id) {
  return request({
    url: '/employees/' + id + '/personalInfo'
  })
}

/**
 * 获取员工岗位信息
 * @param {*} id
 * @returns
 */
export function getEmployeesJobs(id) {
  return request({
    url: '/employees/' + id + '/jobs'
  })
}

/**
 * 更改员工个人信息
 * @param {*} id
 * @returns
 */
export function updateEmployeesDetail(id, data) {
  return request({
    url: '/employees/' + id + '/personalInfo',
    method: 'put',
    data
  })
}

/**
 * 更改员工岗位信息
 * @param {*} id
 * @returns
 */
export function updateEmployeesJobs(id, data) {
  return request({
    url: '/employees/' + id + '/jobs',
    method: 'put',
    data
  })
}

/**
 *
 * 给员工分配角色
 * @param {*} data
 * @returns
 */
export function updateassignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
