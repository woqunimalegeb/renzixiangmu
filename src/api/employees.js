import request from '@/utils/request.js'

export const getEmployeesSimpleList = () => {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

export const getEmployeesList = (params) => {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

export const addEmployees = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

export function importEmployees(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
