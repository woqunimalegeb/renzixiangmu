import { login } from '@/api/user.js'
import { setToken, getToken } from '@/utils/auth.js'
const state = {
  token: getToken() // 用户的token
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

