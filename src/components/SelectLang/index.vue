<template>
  <div style="margin:0 10px">
    <el-dropdown trigger="click" @command="onCommand">
      <div>
        <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :class="{active:$root.$i18n.locale==='zh'}">中文</el-dropdown-item>
        <el-dropdown-item command="en" :class="{active:$root.$i18n.locale==='en'}">english</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    onCommand(type) {
      this.$root.$i18n.locale = type
      Cookies.set('lang', type)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang='scss'>
.active{
  background-color: #ecf5ff;
  color: #66b1ff
}
</style>
