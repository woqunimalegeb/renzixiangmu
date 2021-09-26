<template>
  <el-dialog
    :title="titleText"
    :visible="showDialog"
    width="50%"
    @close="onClose"
  >
    <el-form ref="addForm" :rules="addFormRules" :model="form" label-width="100px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="form.manager" :loading="isloading" loading-text="正在加载中" placeholder="请选择活动区域" @focus="loadEmployeesSimpleList">
          <el-option v-for="item in employessList" :key="item.id" :label="item.username" :value="item.username" />

        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="form.introduce" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getEmployeesSimpleList } from '@/api/employees'
import { getDepartment, addDepartment, updateDepartment } from '@/api/department'

export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    const checkDeptNameisRepeat = async(rule, value, callback) => {
      let isRepeat
      if (this.form.id) {
        const { depts } = await getDepartment()
        const slibings = depts.filter((item) => item.pid === this.row.pid)
        isRepeat = slibings.some(item => item.name === value)
      } else {
        if (!this.row.children) return callback()
        isRepeat = this.row.children.some(item => item.name === value)
      }

      return isRepeat ? callback(new Error('部门已存在')) : callback()
    }
    const checkDeptCodeisRepeat = async(r, value, callback) => {
      const res = await getDepartment()
      let isRepeat
      if (this.form.id) {
        isRepeat = res.depts.some(item => (item.id !== this.row.id && item.code === value))
      } else {
        isRepeat = res.depts.some(item => item.code === value)
      }
      return isRepeat ? callback(new Error('编码已存在')) : callback()
    }
    return {

      form: {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '部门名称要求2-50个字符', trigger: 'blur' },
          { validator: checkDeptNameisRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '部门编码要求2-50个字符', trigger: 'blur' },
          { validator: checkDeptCodeisRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 2, max: 300, message: '部门介绍要求2-50个字符' }
        ]
      },
      employessList: [],
      isloading: false

    }
  },
  computed: {
    titleText() {
      return (this.form.id ? '编辑' : '添加') + '部门'
    }
  },

  created() {
    this.loadEmployeesSimpleList()
  },
  methods: {
    onClose() {
      this.$refs.addForm.resetFields()
      this.$emit('update:show-dialog', false)
      setTimeout(() => {
        this.form = {
          code: '',
          introduce: '',
          manager: '',
          name: ''
        }
      }, 200)
    },
    async  loadEmployeesSimpleList() {
      this.isloading = true
      const res = await getEmployeesSimpleList()
      this.employessList = res
      this.isloading = false
    },
    async onSave() {
      try {
        await this.$refs.addForm.validate()
        if (this.form.pid) {
          const { id, code, introduce, name, manager } = this.form
          await updateDepartment({
            id, code, introduce, name, manager
          })
          this.$message.success('更新成功')
        } else {
          this.form.pid = this.row.id || ''
          await addDepartment(this.form)

          this.$message.success('添加成功')
        } this.onClose()
        this.$emit('add-success')
      } catch (err) {
        console.log(err)
      }
    },
    setForm() {
      this.form = JSON.parse(JSON.stringify(this.row))
    }
  }
}
</script>

<style scoped>

</style>
