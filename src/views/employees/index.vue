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
          <el-table-column label="头像">
            <template v-slot="{row}">
              <img
                v-imgError="require('../../assets/common/bigUserHeader.png')"
                class="Image"
                :src="row.staffPhoto"
                alt=""
                @click="onClickCanvas(row.staffPhoto)"
              >
            </template>
          </el-table-column>
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
              <el-button :disabled="checkPermission(points.pointUserUpdate)" type="text" size="small" @click="$router.push('/employees/'+row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button :disabled="checkPermission(points.pointUserSetJob)" type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="onClickRole(row.id)">角色</el-button>
              <el-button :disabled="checkPermission(point.pointDelete)" type="text" size="small" @click="onClickDel(row)">删除</el-button>
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

    <!-- 点击头像生产二维码弹层 -->
    <el-dialog id="el-dialog__header" :visible.sync="qrcodeDialog">
      <!-- 二维码画布 -->
      <canvas id="canvas" />
    </el-dialog>

    <!-- 点击分配角色弹窗 -->
    <AssignRole
      :set-role-dialog.sync="setRoleDialog"
      :employees-id="employeesId"
      @closeRoleDialog="setRoleDialog=false"
    />
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import { getEmployeesList, delEmployee } from '@/api/employees.js'
import AddEmployees from './components/AddEmployees.vue'
import { formatHireType } from '@/filters'
import QRCode from 'qrcode'
import AssignRole from './components/assignRole.vue'
import { mapGetters } from '@/store/getters'
export default {
  name: 'Employees',
  components: {
    AddEmployees,
    AssignRole
  },
  data() {
    return {
      employees: [], // 数据
      tablePage: {
        page: 1,
        size: 10
      },
      total: null,
      showDialog: false, // 新增弹窗
      qrcodeDialog: false, // 二维码画布弹层
      setRoleDialog: false,
      employeesId: ''// 员工Id
    }
  },

  created() {
    this.loadEmployeesList()
  },
  computed: {
    ...mapGetters(['points', 'roles'])
  },
  mounted() {

  },
  methods: {
    checkPermission(val) {
      return !this.roles.point.includes(val)
    },
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
    },
    // 点击头像显示二维码画布弹层
    onClickCanvas(Image) {
      if (!Image) return this.$message.error('该用户暂未设置头像')
      // 弹层显示，异步，视图还未改变
      this.qrcodeDialog = true
      // 上一步为异步，等视图改变，所以加this.$nextTick
      this.$nextTick(() => {
        // 拿到dom
        const canvas = document.getElementById('canvas')

        QRCode.toCanvas(canvas, Image, error => {
          if (error) return this.$message.error('生成失败')
        })
      })
    },
    onClickRole(rowId) {
      this.setRoleDialog = true
      // 保存用户Id,子组件发请求参数
      this.employeesId = rowId
    }
  }
}
</script>

<style scoped lang='scss'>
.Image{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
::v-deep #el-dialog__header{
  padding:40px 20px 10px !important;
}
::v-deep .el-dialog__body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
