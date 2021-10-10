<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="false">
        <template v-slot:after>
          <el-button size="mini" type="primary" @click="$router.push('/import')">导入</el-button>
          <el-button size="mini" type="primary" @click="onExeclExport">导出</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="showDialog=true"
          >新增员工</el-button>
        </template>
      </PageTools>

      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="">
            <template v-slot="{row}">
              {{ row.formOfEmployment | formatHireType }}
            </template>
          </el-table-column>
          <el-table-column label="部门" sortable="">
            <template v-slot="{row}">
              {{ row.departmentName?row.departmentName:'暂无数据' }}
            </template>
          </el-table-column>
          <el-table-column label="入职时间" sortable="">
            <template v-slot="{row}">
              {{ row.timeOfEntry | formTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template v-slot="scoped">
              {{ scoped.row.enableState?'可用':'不可用' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push('/employees/'+row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onClickDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :page-size="tablePage.size"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <AddEmployees :show-dialog.sync="showDialog" @AddEmployees="loadEmployeesList" />
    <!-- <AddEmployees v-model="showDialog" /> -->
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import { getEmployeesList, delEmployee } from '@/api/employees.js'
import AddEmployees from './components/AddEmployees.vue'
import { formatHireType } from '@/filters'
export default {
  name: 'Employees',
  components: {
    AddEmployees
  },
  data() {
    return {
      employees: [],
      tablePage: {
        page: 1,
        size: 10
      },
      total: null,
      // 新增弹窗
      showDialog: false
    }
  },

  created() {
    this.loadEmployeesList()
  },

  methods: {
    // 获取员工信息
    async loadEmployeesList() {
      const res = await getEmployeesList(this.tablePage)
      console.log(res)
      this.employees = res.rows
      this.total = res.total
    },
    // 点击页码变化
    handleCurrentChange(val) {
      this.tablePage.page = val
      this.loadEmployeesList()
    },
    // 点击删除,通过插槽拿到当前点击数据，传值
    onClickDel(row) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delEmployee(row.id)
        this.$message.success('删除成功!')
        this.loadEmployeesList()
      }).catch(() => {
      })
    },
    // 点击导出
    onExeclExport() {
      import('@/vendor/Export2Excel').then(async excel => {
        // 建立一个对象，形成映射关系，不需要判断，循环员工列表，我们需要的数据格式是[[],[]],所以定义数组，再循环我们的表头，拿到里面的每一项，将数据一一对应的放在数组里面
        const mapKey = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '聘用形式': 'formOfEmployment',
          '部门': 'departmentName'
        }
        // 表头,把mapKey的key形成一个数组，就不需要自己定义
        const tHeader = Object.keys(mapKey)
        // 请求员工列表
        const res = await getEmployeesList({ page: 1, size: this.total })
        const arr = this.formetExeclDate(res.rows, tHeader, mapKey)
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data: arr, // 具体数据 必填
          filename: '员工列表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    formetExeclDate(data, tHeader, mapKey) {
      // 处理数据
      return data.map(item => {
        return tHeader.map(headerItem => {
          if ((item[mapKey[headerItem]] - 0) > 0 && (headerItem === '入职日期' || headerItem === '转正日期')) {
            return formatDate(item[mapKey[headerItem]], '/')
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
