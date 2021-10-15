import router, { varRouter, constantRoutes } from '@/router'
const state = {
  // 存放路由
  routes: [],
  // 按钮标识权限
  points: {
    pointUserUpdate: 'point-user-update',
    pointUserDelete: 'point-user-delete',
    pointUser: 'point-user',
    pointUserAdd: 'POINT-USER-ADD',
    // 权限页面的权限标识
    pointPermissionAdd: 'point-permission-add',
    pointPermissionDelete: 'point-permission-delete'
  }
}

const mutations = {
  filterRouter(state, roles) {
    // 拿我们的用户信息里面的数据跟我们路由规则里面的name进行比较，得到一个新的权限数组
    const filterRouter = varRouter.filter(item => roles.menus.includes(item.name))
    console.log(filterRouter)
    // 将404放到最后面
    const router404 = { path: '*', redirect: '/404', hidden: true }
    // 将我们新的数组添加到动态路由里面
    router.addRoutes([...filterRouter, router404])
    // 把所有的路由都存储到vuex里面，进行侧边栏显示
    state.routes = [...constantRoutes, ...filterRouter, router404]
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
