import router, { varRouter, constantRoutes } from '@/router'
const state = {
  routes: [],
  points: {
    pointUserUpdate: 'POINT-USER-UPDATE',
    pointUserDelete: 'point-user-delete',
    pointUserEdit: 'point-user-edit',
    pointUserSetJob: 'point-user-job',
    // 权限页面的权限标识
    pointPermissionAdd: 'point-permission-add',
    pointPermissionDelete: 'point-permission-delete'
  }
}
const mutations = {
  filterRouter(state, roles) {
    console.log(varRouter)
    const filterRouter = varRouter.filter(item => roles.menus.includes(item.name))
    console.log(filterRouter)
    const router404 = { path: '*', redirect: '/404', hidden: true }
    router.addRoutes([...filterRouter, router404])
    state.routes = [...constantRoutes, ...filterRouter, router404]
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions: {}
}
