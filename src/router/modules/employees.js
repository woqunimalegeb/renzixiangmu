import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      name: 'employees',
      path: '', // 默认子路由
      component: () => import('@/views/employees'),
      // 存储路由信息
      meta: {
        title: '员工', // 用来显示菜单标题
        icon: 'people' // 用来显示菜单图标
      }
    },
    {
      path: ':id', // 默认子路由
      component: () => import('@/views/employees/dateil'),
      hidden: true
    },
    {
      path: 'print/:Id',
      component: () => import('@/views/employees/print'),
      hidden: true
    }
  ]
}
