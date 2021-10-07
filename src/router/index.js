import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import approvalsRouter from '../store/modules/approvals'
import departmentsRouter from '../store/modules/departments'
import employeesRouter from '../store/modules/employees'
import permissionRouter from '../store/modules/permission'
import attendancesRouter from '../store/modules/attendances'
import salarysRouter from '../store/modules/salarys'
import settingRouter from '../store/modules/setting'
import socialRouter from '../store/modules/social'
import employeesImport from '../store/modules/import'
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // 子路由对应的组件 会显示到 父路由组件
    children: [{
      path: 'dashboard', // /dashboard
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 动态路由组
const varRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter,
  employeesImport
]
// 可以创建路由实例
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...varRoutes] // 定义路由规则
})

// router = this.$router
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
