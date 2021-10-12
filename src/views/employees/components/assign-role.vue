<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="setRoleDialog"
      width="50%"
      @close="OnClose"
      @opened="onOpen"
    >

      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="OnClose">取 消</el-button>
        <el-button type="primary" @click="OnSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesList } from '@/api/company.js'
import { getInfoById } from '@/api/user'
import { updateEmployeesRoles } from '@/api/employees'
export default {
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
      checkList: [],
      roles: []
    }
  },

  created() {
    this.loadRolesList()
    this.loadUserRoles()
  },

  methods: {
    async loadRolesList() {
      const res = await getRolesList()
      const res2 = await getRolesList({ page: 1, pagesize: res.total })

      this.roles = res2.rows
    },
    async loadUserRoles() {
      return await getInfoById(this.employeesId)
    },
    async onOpen() {
      const res = await this.loadUserRoles()

      this.checkList = res.roleIds
    },
    OnClose() {
      this.$emit('update:set-role-dialog', false)
      this.checkList = []
    },
    async OnSave() {
      if (!this.checkList.length) return this.$message.error('亲，请分配角色哟')
      await updateEmployeesRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.OnClose()
    }
  }
}
</script>

<style scoped>

</style>
