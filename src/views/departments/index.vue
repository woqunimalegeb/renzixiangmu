<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="department_box box-card">
        <DeptOptions :row="company" :is-root="true" />
        <el-tree :data="depts" :props="defaultProps" :default-expand-all="true">
          <template v-slot="scope">
            <DeptOptions :row="scope.data" @ondel="loadDepartment" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTree } from '@/utils/index.js'
import DeptOptions from './components/dept-options.vue'
export default {
  name: 'Departments',
  components: { DeptOptions },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      company: {},
      depts: []
    }
  },
  created() {
    this.loadDepartment()
  },

  methods: {
    async loadDepartment() {
      const res = await getDepartment()
      this.company = { name: res.companyName, manager: '负责人' }
      this.depts = transListToTree('', res.depts)
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
