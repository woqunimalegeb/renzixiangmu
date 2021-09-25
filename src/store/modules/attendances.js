import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,

  children: [
    { name: 'attendances',
      path: '', // 默认子路由
      component: () => import('@/views/attendances'),
      // 存储路由信息
      meta: {
        title: '考勤', // 用来显示菜单标题
        icon: 'skill' // 用来显示菜单图标
      }
    }
  ]
}
