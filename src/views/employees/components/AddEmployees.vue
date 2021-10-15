<template>
  <el-dialog
    title="新增员工"
    :visible="showDialog"
    @close="onclose"
  >
    <!-- 表单 -->
    <el-form ref="formData" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:100%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" placeholder="请选择部门" @focus="getDepartment" />
        <el-tree
          v-if="isShowTree"
          v-loading="isTreeLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="Treedepts"
          :props="defaultProps"
          @node-click="onNodeClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:100%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="5.5">
          <el-button size="small" @click="onclose">取消</el-button>
          <el-button type="primary" size="small" @click="onSave">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addEmployees } from '@/api/employees.js'
import { getDepartment } from '@/api/departments.js'
import { listTree } from '@/utils'
import hireType from '@/api/constant/employees.js'
export default {
// v-model方法改值的名字，默认是value,修改为showDialog
  // model: {
  //   prop: 'showDialog'
  // },
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // 表单数据
      formData: {
        username: '',
        mobile: '13300000003',
        formOfEmployment: 1,
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      // 表单规则
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: ['blur', 'change'] }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '转正时间', trigger: 'blur' }]
      },
      // 把定义的数据保存到data里面
      hireType: hireType.hireType,
      // 树形数据
      Treedepts: [],
      // 数据默认名字修改
      defaultProps: {
        label: 'name'
      },
      isTreeLoading: false,
      isShowTree: false
    }
  },
  created() {

  },

  methods: {
    // 关闭弹窗
    onclose() {
      this.$refs.formData.resetFields()
      // .sync方法
      this.$emit('update:showDialog', false)
      // v-model方法
      // this.$emit('input', false)
    },
    async getDepartment() {
      // 树形显示
      this.isShowTree = true
      // Loading显示
      this.isTreeLoading = true
      // 发请求
      const res = await getDepartment()
      this.isTreeLoading = false
      // 把数据改成树形数据
      const Treedepts = listTree('', res.depts)
      // 保存数据
      this.Treedepts = Treedepts
    },
    // node-click节点被点击时的回调
    // 点击树形控制某一项
    onNodeClick(row) {
      // 树形隐藏
      this.isShowTree = false
      // 部门输入框赋值
      this.formData.departmentName = row.name
    },
    // 点击确定
    async onSave() {
      try {
        await this.$refs.formData.validate()
        await addEmployees(this.formData)
        this.onclose()
        this.$message.success('新增成功')
        // this.$parent.loadEmployeesList()
        this.$emit('AddEmployees')
      } catch (error) {
        console.dir(error)
      }
    }

  }
}
</script>

<style scoped>

</style>
