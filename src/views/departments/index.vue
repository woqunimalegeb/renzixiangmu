<template>
  <div class="department-container">
    <div class="app-container">
      <el-card class="department-box box-card">
        <DeptOption :row="company" :is-root="true" @click-add="clickAdd($event)" />
        <!-- 树形 -->
        <el-tree :data="depts" :props="defaultProps" :default-expand-all="true">
          <template v-slot="scope">
            <DeptOption
              :row="scope.data"
              @click-add="clickAdd($event)"
              @ondel="loadDepartment"
              @click-edit="clickEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加子部门弹框 -->l
    <AddDept
      ref="addDept"
      :dialog-visible.sync="dialogVisible"
      :row="deptRow"
      @add-success="loadDepartment"
    />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department.js'
import { listTree } from '@/utils'
import DeptOption from './components/dept-option.vue'
import AddDept from './components/dept-add.vue'
export default {
  name: 'Departments',
  components: {
    DeptOption,
    AddDept
  },
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
    // 查询企业的部门列表
    async loadDepartment() {
      const res = await getDepartment()
      // children: listTree('', res.depts)，上面的操作添加子部门里面的date里面没有children所以传值的时候手动加进去，把我们处理好的树形结构数据传入进去，就可以通过children得到一级数据
      this.company = { name: res.companyName, manager: '负责人', children: listTree('', res.depts) }
      // 调用方法，把数据改成树形结构的
      this.depts = listTree('', res.depts)
    },
    // 点击添加子部门
    clickAdd(data) {
      this.dialogVisible = true
      this.deptRow = data
    },
    // 点击查看
    clickEdit(data) {
      this.dialogVisible = true
      this.deptRow = data
      // 利用ref调用子组件的方法
      setTimeout(() => {
        this.$refs.addDept.setform()
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.department-box{
  .company-tiy{
    font-size: 14px;
    font-weight: 700;
  }
  .company-option{
    display: flex;
    justify-content: flex-end;
    span:nth-child(1){
      margin-right: 10px;
    }
  }
  .el-tree{
    margin-top: 10px;
    border-top: 1px solid #ccc;
  }
}

</style>
