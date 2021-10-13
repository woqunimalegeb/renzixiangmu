<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="company-box box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="third">
            <!-- 按钮 -->
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="editRoleDialog=true">添加角色</el-button>
            <!-- 表格 -->
            <el-table
              border
              :data="roles"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="150"
                label="序号"
              />
              <el-table-column
                prop="name"
                label="角色名"
                width="200"
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
                align="center"
                width="250px"
              >
                <template v-slot="{ row }">
                  <el-button type="text" size="small" @click="onSetPermission(row)">分配权限</el-button>
                  <el-button type="text" size="small" @click="onDetRoles(row)">修改</el-button>
                  <el-button type="text" size="small" @click="onDelRoles(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              :current-page="page.page"
              :page-size="page.pagesize"
              layout="total, prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="info">
            <el-form label-width="250px" :model="formLabelAlign" :disabled="true" class="from">
              <el-form-item label="企业名称">
                <el-input v-model="formLabelAlign.name" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formLabelAlign.companyAddress" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formLabelAlign.companyPhone" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.mailbox" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formLabelAlign.remarks" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
    <el-dialog
      :title="title"
      :visible.sync="editRoleDialog"
      width="30%"
      @close="onclose"
    >
      <el-form ref="form" :model="form" :rules="fromRules" label-width="80px" class="from">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="setPermissionTitle"
      :visible.sync="setPermissionDialoge"
      width="50%"
      @close="onClose"
    >
      <el-tree ref="setPermissionTree" node-key="id" :check-strictly="true" :default-checked-keys="defaultKeys" :data="permissionList" :props="defaultProps" show-checkbox default-expand-all icon-class=" " />
      <span slot="footer" class="dialog-footer">
        <el-button @click="setPermissionDialoge = false">取 消</el-button>
        <el-button type="primary" @click="onSetPermissionSave">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getPermissionList, setPermissionToRole } from '@/api/permission'
import { getRolesList, DELETERoles, getRolesById, getByIdUpdate, addRoles, companyAll } from '@/api/company.js'
import { listTree } from '@/utils'

export default {
  name: 'Settings',
  data() {
    return {
      activeName: 'third', // 控制tab栏默认选中
      roles: [],
      // 分页的页码和条数，请求需传参，跟接口文档保持一致
      page: {
        page: 1,
        pagesize: 10
      },
      // 分页的总条数
      total: 20,
      // 控制修改弹层是否显示
      editRoleDialog: false,
      setPermissionDialoge: false,
      setPermissionTitle: '',
      defaultKeys: [],
      form: {
        name: '',
        description: ''
      },
      // 正则校验规则
      fromRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      formLabelAlign: {
        name: '',
        companyAddress: '',
        companyPhone: '',
        mailbox: '',
        remarks: ''
      },
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      permissionList: [],
      defaultProps: {

        label: 'name'
      }
    }
  },

  computed: {
    title() {
      return (this.form.id ? '编辑' : '新增') + '角色'
    }
  },

  created() {
    this.loadRolesList()
    this.loadcompanyAll()
  },

  methods: {
    // 获取全部角色列表
    async loadRolesList() {
      const res = await getRolesList(this.page)
      console.log(res)
      this.roles = res.rows
      this.total = res.total
    },
    // 点击页码切换
    handleCurrentChange(val) {
      console.log(val)
      this.page.page = val
      this.loadRolesList()
    },
    // 点击删除
    onDelRoles(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await DELETERoles(id)
        this.$message.success('删除成功')
        this.loadRolesList()
      }).catch(() => {

      })
    },
    // 根据id获取角色
    async onDetRoles(row) {
      const res = await getRolesById(row.id)
      console.log(res)
      this.form = res
      this.editRoleDialog = true
    },
    // 点击确定
    async onSave() {
      try {
        await this.$refs.form.validate()
        if (this.form.id) {
          // 根据id更新角色
          await getByIdUpdate(this.form)
        } else {
          // 新增
          await addRoles(this.form)
        }

        this.editRoleDialog = false
        this.loadRolesList()
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 关闭弹窗的回调
    onclose() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    async loadcompanyAll() {
      const res = await companyAll()
      console.log(res)
      this.formLabelAlign = res[0]
    },
    async onSetPermission(row) {
      this.roleId = row.id
      this.setPermissionTitle = '为[' + row.name + ']分配权限'
      this.setPermissionDialoge = true
      this.permissionList = listTree('0', await getPermissionList())
      this.defaultKeys = (await getRolesById(row.id)).permIds
    },
    async onSetPermissionSave() {
      const permissionIds = this.$refs.setPermissionTree.getCheckedKeys()
      if (!permissionIds.length) return this.$message.error('请选择必要的权限')
      await setPermissionToRole({
        id: this.roleId,
        permIds: permissionIds
      })
      this.$message('分配成功')
      this.setPermissionDialoge = false
    },
    onClose() {
      this.defaultKeys = []
    }
  }
}
</script>

<style scoped lang='scss'>
.company-box{
  ::v-deep.el-tabs__item{
    font-size: 20px;
    padding: 0 50px;
    width: 150px;
    text-align: center;
  }
  .el-pagination{
    display: flex;
    justify-content: flex-end;
  }

}
.from{
  margin-top: 30px;
}
::v-deep.el-input.is-disabled .el-input__inner{
  width: 500px;
  font-size: 16px;
}

</style>
