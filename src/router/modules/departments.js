import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      name: 'departments',
      path: '', // 默认子路由
      component: () => import('@/views/departments'),
      // 存储路由信息
      meta: {
        title: '组织架构', // 用来显示菜单标题
        icon: 'tree' // 用来显示菜单图标
      }
    }
  ]
}
