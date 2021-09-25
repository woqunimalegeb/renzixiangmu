import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,

  children: [
    { name: 'approvals',
      path: '', // 默认子路由
      component: () => import('@/views/approvals'),
      // 存储路由信息
      meta: {
        title: '审批', // 用来显示菜单标题
        icon: 'tree-table' // 用来显示菜单图标
      }
    }
  ]
}
