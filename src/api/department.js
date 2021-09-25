import request from '@/utils/request.js'
export function getDepartment() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}
export function delDeptById() {
  return request({
    method: 'DELETE',
    url: '/company/department/+"id"'
  })
}
