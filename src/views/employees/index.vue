<template>
  <div class="dashboard-container">
    <div class="app-container">
      {{ type===1 ? '正式':'非正式' }}
      <PageTools :show-before="false">
        <template v-slot:after>
          <el-button type="primary" size="mini">导入</el-button>
          <el-button type="primary" size="mini">导出</el-button>
          <el-button icon="el-icon-plus" type="primary" size="mini">新增员工</el-button>
        </template>

      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" sortable prop="formOfEmployment">
            <template v-slot="{row}">
              {{ row.formOfEmployment | formatHireType }}
            </template>
          </el-table-column>
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="createTime">
            <template v-slot="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template v-slot="scope">
              {{ scope.row.enableState ? '可用':'不可用' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeesList } from '@/api/employees'
export default {
  name: 'Employees',
  data() {
    return {
      tablePage: {
        page: 1,
        size: 10
      },
      total: 0,
      employees: [],
      type: ''
    }
  },

  created() {
    this.loadEmployees()
    this.type = 1
  },

  methods: {
    async loadEmployees() {
      const res = await getEmployeesList(this.tablePage)
      this.total = res.total
      this.employees = res.rows
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
