<template>
  <el-dialog
    title="分配角色"
    :visible="setRoleDialog"
    width="50%"
    @close="onclose"
    @opened="onOpen"
  >
    <el-checkbox-group
      v-model="checkList"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <!--label可以是渲染的值，也可以用来保存其他的东西，比如选中的id  -->
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesList } from '@/api/company.js'
import { getInfoById } from '@/api/user.js'
import { updateassignRoles } from '@/api/employees.js'
export default {
  name: 'Assignrole',
  props: {
    setRoleDialog: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      checkList: [], // 角色ID
      roles: []// 角色列表
    }
  },

  created() {
    this.loadRolesList()
  },

  methods: {
    // 点击关闭
    onclose() {
      this.$emit('closeRoleDialog')
      this.checkList = []
    },
    // 点击确定
    async onSave() {
      // 判断权限是否为空，权限至少得有一项
      if (!this.checkList.length) return this.$message.error('请分配权限')
      await updateassignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.onclose()
    },
    // 获取所有角色列表
    async loadRolesList() {
      const res = await getRolesList()
      const res1 = await getRolesList({ page: 1, pagesize: res.total })
      this.roles = res1.rows
    },
    // 获取角色Id
    async loadInfoById() {
      this.loading = true
      return await getInfoById(this.employeesId)
    },
    // Dialog 打开动画结束时的回调,获取角色Id,赋值渲染
    async onOpen() {
      const res = await this.loadInfoById()
      this.loading = false
      this.checkList = res.roleIds
    }
  }
}
</script>

<style scoped>

</style>
