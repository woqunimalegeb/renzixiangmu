import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  name: 'import',
  children: [
    {
      path: '',
      component: () => import('@/views/import')
    }
  ]
}
