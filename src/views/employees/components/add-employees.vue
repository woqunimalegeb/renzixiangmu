<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="onClose">
    <!-- 表单 -->
    <el-form ref="addEmployeesForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />

        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree v-if="isShowTree" v-loading="isTreeLoading" :data="treeDepts" :props="defaultProps" @node-click="onNodeClick" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="onClose">取消</el-button>
          <el-button type="primary" size="small" @click="onSave">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import constantData from '@/api/constant/employees.js'
import { getDepartment } from '@/api/department.js'
import { transListToTree } from '@/utils'
import { addEmployees } from '@/api/employees.js'
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }},
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
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
      hireType: constantData.hireType,
      treeDepts: [],
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
    onClose() {
      this.$refs.addEmployeesForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getDepartments() {
      this.isShowTree = true
      this.isTreeLoading = true
      const res = await getDepartment()
      this.isTreeLoading = false
      const treeDepts = transListToTree('', res.depts)
      console.log(treeDepts)
      this.treeDepts = treeDepts
    },
    onNodeClick(row) {
      this.isShowTree = false
      this.formData.departmentName = row.name
    },
    async onSave() {
      try {
        await this.$refs.addEmployeesForm.validate()
        await addEmployees(this.formData)
        this.$message.success('添加成功')
        this.onClose()
        this.$emit('add-success')
      } catch (err) {
        this.$message.info('表单不合法')
      }
    }
  }
}

</script>

<style scoped>

</style>
