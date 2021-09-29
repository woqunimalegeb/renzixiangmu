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
