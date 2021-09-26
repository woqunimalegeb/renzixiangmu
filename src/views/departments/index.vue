<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="department_box box-card">
        <DeptOptions :row="company" :is-root="true" @click-add="onClickAdd" />
        <el-tree :data="depts" :props="defaultProps" :default-expand-all="true">
          <template v-slot="scope">
            <DeptOptions :row="scope.data" @click-edit="onClickEdit" @ondel="loadDepartment" @click-add="onClickAdd" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!--添加部门组织弹框-->
    <AddDept ref="addDept" :row="deptRow" :show-dialog.sync="dialogVisible" @add-success="loadDepartment" />
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTree } from '@/utils/index.js'
import DeptOptions from './components/dept-options.vue'
import AddDept from './components/deep-add.vue'
export default {
  name: 'Departments',
  components: { DeptOptions, AddDept },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      company: {},
      depts: [],
      dialogVisible: false,
      deptRow: {}
    }
  },
  created() {
    this.loadDepartment()
  },

  methods: {
    async loadDepartment() {
      const res = await getDepartment()
      this.company = { name: res.companyName, manager: '负责人', children: transListToTree('', res.depts) }
      this.depts = transListToTree('', res.depts)
    },
    onClickAdd(data) {
      this.dialogVisible = true
      this.deptRow = data
    },
    onClickEdit(data) {
      this.dialogVisible = true
      this.deptRow = data
      setTimeout(() => { this.$refs.addDept.setForm() }
      )
    }
  }
}
</script>

<style scoped lang='scss'>
.department_box{

.el-tree{
  margin-top: 10px;
  border-top: 1px solid #ccc;
}
}

</style>
