import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  name: 'social_securitys',
  children: [
    {

      path: '', // 默认子路由
      component: () => import('@/views/social'),
      // 存储路由信息
      meta: {
        title: '社保', // 用来显示菜单标题
        icon: 'table' // 用来显示菜单图标
      }
    }
  ]
}
