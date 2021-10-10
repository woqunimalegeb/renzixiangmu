// 引入接口
import { login, getInfo, getInfoById } from '@/api/user.js'
import { setToken, getToken, removeToken, setTokenTime } from '@/utils/auth.js'
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
    // 根据获取用户信息请求来获取用户详细信息请求
    const InfoById = await getInfoById(res.userId)
    console.log(InfoById)
    // 将两个数据都保存到数据里面
    context.commit('setUserInfo', { ...res, ...InfoById })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

