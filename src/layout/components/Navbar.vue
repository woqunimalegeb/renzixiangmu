<template>
  <div class="navbar">
    <!-- 头部导航栏 -->

    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="app-breadcrumb">
      江苏传智播客教育科技股份有限公司
      <span class="breadBtn">体验版</span>
    </div>

    <!-- 面包屑
    <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <span><ScreenFull /></span>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 定义自定义事件 v-imgError-->
          <img v-imgError="defauitImg" :src="avatar" class="user-avatar">
          <span>{{ username }}</span>
          <i class="el-icon-arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
// 引入图片路径
import defauitImg from '@/assets/common/bigUserHeader.png'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      // 定义图片变量，因为直接写路径，打包会出错
      defauitImg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出登录
    logout() {
      // 调用user/logout方法清除token和数据
      this.$store.commit('user/logout')
      // 跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .app-breadcrumb {
      display: inline-block;
      font-size: 18px;
      line-height: 50px;
      margin-left: 10px;
      color: #ffffff;
      cursor: text;
      .breadBtn {
        background: #84a9fe;
        font-size: 14px;
        padding: 0 10px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        margin-left: 15px;
      }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
display: flex;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        color: #fff;
        span{
          margin: 0 6px;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
