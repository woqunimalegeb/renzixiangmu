import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  name: 'settings',
  children: [
    {
      path: '', // 默认子路由
      component: () => import('@/views/setting'),
      // 存储路由信息
      meta: {
        title: '公司设置', // 用来显示菜单标题
        icon: 'setting' // 用来显示菜单图标
      }
    }
  ]
}
