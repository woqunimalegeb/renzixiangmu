<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="false">
        <template v-slot:after>
          <el-button type="primary" icon="el-icon-edit" size="small" @click="onClickAdd(1,'0')">
            添加权限
          </el-button>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table ref="table" :data="Permission" row-key="id">
        <el-table-column label="名称">
          <template v-slot="{row}">
            <i v-if="row.pid==='0'" style="margin-right:5px" class="el-icon-folder-opened" @click="expend(row)" />
            <i v-else style="margin-right:5px" class="el-icon-view" />
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type===1" type="text" @click="onClickAdd(2,row.id)">添加</el-button>
            <el-button type="text" @click="onEdit(row.id)">编辑</el-button>
            <el-button type="text" @click="onDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加弹窗 -->
    <el-dialog
      :visible.sync="PermissionDialog"
      width="50%"
      @close="onclose"
    >
      <template v-slot:title>
        {{ title?'编辑权限':'添加权限' }}
      </template>
      <el-form ref="form" :model="addEditForm" :rules="rules" label-width="80px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="addEditForm.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="addEditForm.code" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="addEditForm.description" />
        </el-form-item>
        <el-form-item label="权限开启">
          <el-switch
            v-model="addEditForm.enVisible"
            active-color="#13ce66"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onclose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, getPermissionInfo, editPermissionInfo, PermissionDelete } from '@/api/permission.js'
import { listTree } from '@/utils'
import perMission from '@/mixins/permission'
export default {
  name: 'Permission',
  mixins: [perMission],
  data() {
    return {
      title: false,
      Permission: [],
      // 添加弹窗
      PermissionDialog: false,
      // 添加表单数据
      addEditForm: {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        type: 1,
        pid: ''
      },
      // 添加表单规则
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '权限描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadPermissionList()
  },

  methods: {
    // 获取权限列表
    async loadPermissionList() {
      const res = await getPermissionList()
      this.Permission = listTree('0', res)
    },
    // 当前点击是否展开
    expend(row) {
      row.isexpend = !row.isexpend
      // 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
      this.$refs.table.toggleRowExpansion(row, row.isexpend)
    },
    // 点击关闭弹窗
    onclose() {
      this.PermissionDialog = false
      this.addEditForm = {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        type: 1,
        pid: ''
      }
    },
    // 点击保存
    async onSave() {
      try {
        await this.$refs.form.validate()
        // 编辑功能
        if (this.addEditForm.id) {
          await editPermissionInfo(this.addEditForm)
          this.$message.success('编辑成功')
        } else {
          // 添加功能
          await addPermission(this.addEditForm)
          this.$message.success('添加成功')
        }
        this.onclose()
        this.loadPermissionList()
      } catch (error) {
        console.log(error)
      }
    },
    // 点击添加传值
    onClickAdd(type, pid) {
      this.title = false
      this.addEditForm.type = type
      this.addEditForm.pid = pid
      this.PermissionDialog = true
    },
    // 点击编辑
    async onEdit(id) {
      this.PermissionDialog = true
      this.title = true
      this.addEditForm = await getPermissionInfo(id)
    },
    // 点击删除
    async onDelete(id) {
      await PermissionDelete(id)
      this.$message.success('删除成功')
      this.loadPermissionList()
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-table__expand-icon{
  display: none !important;
}
</style>
