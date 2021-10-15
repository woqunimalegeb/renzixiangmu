import router from '@/router'
import store from '@/store'
// 进度条组件
import nProgress from 'nprogress'
// 进度条组件css
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  nProgress.start()
  // 判断是否登录
  if (store.state.user.token) {
    // 每次刷新时就发送获取用户信息请求，因为保存在vuex刷新会没有,所以判断里面有没有数据,没有就发送请求
    if (!store.state.user.UserInfo.userId) {
      // 拿到vuex里面的用户信息数据
      const { roles } = await store.dispatch('user/getUserInfo')
      store.commit('permission/filterRouter', roles)
      // 当我们判断用户是否已经添加路由的前后，不能都是用**next()**，在添加路由之后应该使用 **next(to.path)**， 否则会使刷新页面之后 权限消失，这属于一个vue-router的**已知缺陷**
      next(to.path)
    }

    // 如果登录了
    // 判断是否为登录页面
    // 如果不是登录页面就next(),是登录页面就next('/')
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 判断是否为登录页面
  // 是登录页面next()，不是跳转到登录页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  // 结束进度条
  nProgress.done()
})
