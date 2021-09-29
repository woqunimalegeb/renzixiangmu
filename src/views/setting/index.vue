<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="company-box box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="editVisible=true">新增角色</el-button>
            <el-table
              border
              :data="roles"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                width="150"
              />
              <el-table-column
                prop="name"
                label="角色名"
                width="180"
                sortable
              />
              <el-table-column
                prop="description"
                label="描述"
                sortable
              />
              <el-table-column
                prop="address"
                label="操作"
                width="250"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-button size="mini" type="text">分配权限</el-button>
                  <el-button size="mini" type="text" @click="onEditRoles(row)">修改</el-button>
                  <el-button size="mini" type="text" @click="onDelRoles(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="page.page"
              :page-size="page.pageSize"
              layout="total, prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>

          <el-tab-pane label="公司信息" name="info">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog
      :title="titleText"
      :visible.sync="editVisible"
      width="30%"
      @close="onDialogClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delRole, getRoleById, getRoleList, updateRole, addRole } from '@/api/company.js'
export default {
  name: 'Settings',
  data() {
    return {
      activeName: 'role',
      roles: [],
      page: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      editVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    titleText() {
      return (this.form.id ? '编辑' : '新增') + '角色'
    }
  },

  created() {
    this.loadRoleList()
  },
  methods: {
    async loadRoleList() {
      const res = await getRoleList(this.page)
      console.log(res)
      this.roles = res.rows
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.loadRoleList()
    },
    onDelRoles(id) {
      this.$confirm('此操作将永久删除该角色，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRole(id)
        this.$message.success('删除成功')
        this.loadRoleList()
      }).catch(() => {})
    },
    async onEditRoles(row) {
      this.editVisible = true
      const res = await getRoleById(row.id)
      this.form = res
      console.log(res)
    },
    async onSave() {
      try {
        await this.$refs.form.validate()
        if (this.form.id) {
          await updateRole(this.form)
        } else {
          await addRole(this.form)
        }
        this.editVisible = false
        this.$message.success('更新成功')
        this.loadRoleList()
      } catch (err) {
        console.log(err)
      }
    },
    onDialogClose() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    }
  }

}
</script>

<style scoped lang='scss'>
.company-box{
 ::v-deep.el-tabs__item{
    font-size: 18px;
    padding: 0 40px;
    width: 150px;
    text-align: center;
  }
  .el-pagination{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
