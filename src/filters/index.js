import constant from '@/api/constant/employees.js'

// 格式化员工里的聘用状态

export const formatHireType = (val) => {
  return val ? constant.hireType.find(item => item.id === (val - 0)).value : '暂无数据'
}

// 定义时间过滤器
export const formTime = (val, str = '-') => {
  const timeObj = new Date(val)
  const y = timeObj.getFullYear()
  const m = (timeObj.getMonth() + 1).toString().padStart(2, '0')
  const d = (timeObj.getDate()).toString().padStart(2, '0')
  return `${y}${str}${m}${str}${d}`
}
