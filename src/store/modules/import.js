import Layout from '@/layout'
export default {
  path: '/employees/import',
  component: Layout,
  name: 'import',
  children: [
    {
      path: '',
      component: () => import('@/views/import')
    }
  ]
}
