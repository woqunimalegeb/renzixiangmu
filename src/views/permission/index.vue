<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="false">
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  data() {
    return {

    }
  },

  created() {

  },

  methods: {

  }
}
</script>

<style scoped lang='scss'>

</style>
