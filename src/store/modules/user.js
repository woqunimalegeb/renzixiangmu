// 引入接口
import { login, getInfo, getInfoById } from '@/api/user.js'
import { setToken, getToken, removeToken, setTokenTime } from '@/utils/auth.js'
import { resetRouter } from '@/router'
const state = {
  // 存token
  // 调用Cookies里的getToken
  token: getToken(),
  UserInfo: {}
}
const mutations = {
  // 给TOken赋值
  setToken(state, plyload) {
    // 给token赋值
    state.token = plyload
    // 调用Cookies里的setToken把token存本地
    setToken(plyload)

    // 存token时存时间
    setTokenTime()
  },
  // 给UserInfo赋值
  setUserInfo(state, plyload) {
    state.UserInfo = plyload
  },
  logout(state) {
    // 清除vuex里的token
    state.token = null
    // 清除本地的token
    removeToken()
    // 清除vuex里的UserInfo数据
    state.UserInfo = {}
    // 重置路由，登录满权限的再登录没有权限的也会有权限，因为登录满权限的账号后会叠加
    resetRouter()
  }
}
const actions = {
  // 登录请求
  async Login(context, data) {
    const res = await login(data)
    console.log(res)

    context.commit('setToken', res)
  },
  // 用户刷新页面都会发起请求
  async getUserInfo(context) {
    // 获取用户信息请求
    const res = await getInfo()
    console.log(res)
    // 按钮标识权限大写转小写
    res.roles.points.forEach((item, index) => {
      if (typeof item !== 'string') return
      res.roles.points[index] = item.toLocaleLowerCase()
    })
    // 根据获取用户信息请求来获取用户详细信息请求
    const InfoById = await getInfoById(res.userId)
    console.log(InfoById)
    // 将两个数据都保存到数据里面
    context.commit('setUserInfo', { ...res, ...InfoById })
    // 将res数据传出去
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

