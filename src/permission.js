import router from '@/router'
import store from '@/store'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 路由的前置守卫
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nProgress.start()
  // 判断 是否登录
  if (store.state.user.token) {
    // 如果登录了
    //     判断访问的是否为 登录页面
    // 发送请求获取用户资料的数据
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getUserInfo')
    }

    if (to.path === '/login') {
      // 不让进登录 去主页
      next('/')
    } else {
      next()
    }
    //     不是登录页 next()
    //     是登录页 next('/')
  } else {
    // 如果没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

