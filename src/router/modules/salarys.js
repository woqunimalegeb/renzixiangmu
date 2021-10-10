import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      name: 'salarys',
      path: '', // 默认子路由
      component: () => import('@/views/salarys'),
      // 存储路由信息
      meta: {
        title: '工资', // 用来显示菜单标题
        icon: 'money' // 用来显示菜单图标
      }
    }
  ]
}
