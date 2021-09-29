import employees from '@/api/constant/employees.js'

export const formatHireType = (val) => {
  return employees.hireType.find(item => item.id === val).value
}
export const formatDate = (val, str = '-') => {
  const timeObj = new Date(val)
  const y = timeObj.getFullYear()
  const m = (timeObj.getMonth() + 1).toString().padStart(2, '0')
  const d = (timeObj.getDate()).toString().padStart(2, '0')
  return `${y}${str}${m}${str}${d}`
}
