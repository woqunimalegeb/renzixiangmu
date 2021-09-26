import request from '@/utils/request.js'

export const getEmployeesSimpleList = () => {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
