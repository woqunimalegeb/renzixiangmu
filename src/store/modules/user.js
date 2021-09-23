import { login, getInfo, getInfoById } from '@/api/user.js'
import { setToken, getToken, removeToken, setTokenTime } from '@/utils/auth.js'
const state = {
  token: getToken(), // 用户的token
  userInfo: {}
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
    setTokenTime()
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  logout(state) {
    state.token = null
    removeToken()
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
  },
  // 获取用户信息
  async getUserInfo(context) {
    console.log('获取用户信息')
    const res = await getInfo()
    const userInfoRes = await getInfoById(res.userId)
    context.commit('setUserInfo', { ...res, ...userInfoRes })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

