import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  children: [
    {
      name: 'import',
      path: '', // 默认子路由
      component: () => import('@/views/import')
      // 存储路由信息
    }
  ]
}
