import request from '@/utils/request.js'
export function getDepartment() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}
export function delDeptById(id) {
  return request({
    method: 'DELETE',
    url: '/company/department/' + id
  })
}
export function addDepartment(data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}

export function updateDepartment(data) {
  return request({
    method: 'PUT',
    url: '/company/department/' + data.id,
    data
  })
}
