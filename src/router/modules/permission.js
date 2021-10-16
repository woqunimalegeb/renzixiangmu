import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  name: 'permissions',
  children: [
    { name: 'permissions',
      path: '', // 默认子路由
      component: () => import('@/views/permission'),
      // 存储路由信息
      meta: {
        title: '权限管理', // 用来显示菜单标题
        icon: 'lock' // 用来显示菜单图标
      }
    }
  ]
}
