<template>
  <div class="dashboard-container">
    <div class="app-container">
      {{ type===1 ? '正式':'非正式' }}
      <PageTools :show-before="false">
        <template v-slot:after>
          <el-button type="primary" size="mini" @click="$router.push('/employees/import')">导入</el-button>
          <el-button type="primary" size="mini" @click="onExcelExport">导出</el-button>
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="showDialog=true">新增员工</el-button>
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
          <el-table-column label="部门" sortable>
            <template v-slot="{row}">
              {{ row.departmentName || '暂未设置' }}
            </template>
          </el-table-column>
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
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push('/employees/'+row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination :total="total" :page-size="tablePage.size" layout="total,prev, pager, next" @current-change="handleCurrentChange" />
        </el-row>
      </el-card>
    </div>
    <AddEmployees :show-dialog.sync="showDialog" @add-success="loadEmployees" />

  </div>
</template>

<script>
import { delEmployee, getEmployeesList } from '@/api/employees'
import AddEmployees from './components/add-employees.vue'
import { formatHireType } from '@/filters'

export default {
  name: 'Employees',
  components: {
    AddEmployees
  },
  data() {
    return {
      tablePage: {
        page: 1,
        size: 5
      },
      total: 0,
      employees: [],
      showDialog: false
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
    },
    handleCurrentChange(val) {
      this.tablePage.page = val
      this.loadEmployees()
    },
    onDelete(row) {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delEmployee(row.id)
        this.$message.success('删除成功')
        this.loadEmployees()
      }).catch(() => {})
    },
    onExcelExport() {
      import('@/vendor/Export2Excel').then(async excel => {
        // const tHeader = ['姓名', '手机号', '入职日期', '聘用形式', '转正日记', '工号', '部门']
        const res = await getEmployeesList({ page: 1, size: this.total })
        const mapKey = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        const tHeader = Object.keys(mapKey)
        const arr = this.formatExcelData(res.rows, tHeader, mapKey)
        console.log(res)

        excel.export_json_to_excel({
          header: tHeader,
          data: arr,
          filename: '黑马员工列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatExcelData(data, tHeader, mapKey) {
      return data.map(item => {
        return tHeader.map(headerItem => {
          if ((item[mapKey[headerItem]] - 0) > 0 && (headerItem === '入职日期' || headerItem === '转正日期')) {
            return this.formatDate(item[mapKey[headerItem]], '/')
          } else if (headerItem === '聘用形式') {
            return formatHireType(item[mapKey[headerItem]])
          }
          return item[mapKey[headerItem]]
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
