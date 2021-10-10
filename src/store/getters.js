const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.UserInfo.staffPhoto,
  username: state => state.user.UserInfo.username
}
export default getters
