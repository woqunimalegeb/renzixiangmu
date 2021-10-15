const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.UserInfo.staffPhoto,
  username: state => state.user.UserInfo.username,
  roles: state => state.user.UserInfo.roles,
  points: state => state.permission.points
}
export default getters
