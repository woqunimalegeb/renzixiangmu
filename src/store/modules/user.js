import { login, getInfo } from '@/api/user.js'
import { setToken, getToken } from '@/utils/auth.js'
const state = {
  token: getToken(), // 用户的token
  userInfo: {}
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
  },
  // 获取用户信息
  async getUserInfo(context) {
    const res = await getInfo()
    context.commit('setUserInfo', res)
    console.log(res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

