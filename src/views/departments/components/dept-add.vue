<template>
  <el-dialog
    :title="titleText"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
  >
    <el-form ref="form" :model="form" :rules="addFormRules" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!--  loading-text="正在加载中..." :loading="isLoading" 加loading效果 -->
        <!-- @focus="loadEmployeesList" 获取焦点时触发请求 -->
        <el-select v-model="form.manager" placeholder="请选择" loading-text="正在加载中..." :loading="isLoading" @focus="loadEmployeesList">
          <el-option v-for="item in EmployeesList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click.native="$emit('click-add')">取 消</el-button>
      <el-button type="primary" @click.native="$emit('click-add')">确 定</el-button> -->
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="addIncreased">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDepartment, getIncreased, updateDepartment } from '@/api/department.js'
import { getEmployeesSimpleList } from '@/api/employees.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    // 校验部门名称是否重复
    const checkDeptNameisRepeat = async(rule, value, callback) => {
      let isRepeat
      // 判断当前是编辑还是添加部门弹层
      if (this.form.id) {
        // 编辑
        // 调用获取企业的部门列表请求
        const { depts } = await getDepartment()
        // 循环拿到数据item.pid === this.row.pid,但是不能包括自己item.id !== this.row.id
        const slibings = depts.filter((item) => (item.id !== this.row.id && item.pid === this.row.pid))
        isRepeat = slibings.some(item => item.name === value)
        console.log(slibings)
      } else {
        // 添加
        if (!this.row.children) return callback()
        isRepeat = this.row.children.some(item => item.name === value)
      }
      // 判断当前这一项有没有子级

      return isRepeat ? callback(new Error('部门已存在')) : callback()
    }
    // 校验部门编码是否重复
    const checkDeptCodeisRepeat = async(rule, value, callback) => {
      // 调用获取企业的部门列表请求
      const res = await getDepartment()
      let isRepeat
      // 判断当前是编辑还是添加部门弹层
      if (this.form.id) {
        // 编辑
        isRepeat = res.depts.some((item) => (item.id !== this.row.id && item.code === value))
      } else {
        // 添加
        isRepeat = res.depts.some(item => item.code === value)
      }

      return isRepeat ? callback(new Error('编码已存在')) : callback()
    }
    return {
      // 表单数据
      form: {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      },
      // 定义校验规则
      addFormRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '部门名称要求2-50个字符', trigger: 'blur' },
          { validator: checkDeptNameisRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkDeptCodeisRepeat, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      EmployeesList: [],
      isLoading: false
    }
  },
  // 判断是编辑部门还是添加部门，利用数据里面的id
  computed: {
    titleText() {
      return (this.form.id ? '编辑' : '添加') + '部门'
    }
  },
  created() {
    this.loadEmployeesList()
  },

  methods: {
    // 子组件关闭弹窗修改值
    onClose() {
      // 对表单进行重置
      this.$refs.form.resetFields()
      // 父组件调用.sync修改控制弹层关闭的值
      this.$emit('update:dialogVisible', false)
      // 编辑或添加弹层关闭时清空表单数据，来判断显示是编辑还是添加部门，编辑部门的时候给表单赋值成了row,如果不清空数据还是会保留
      // 数据改变视图还未改变，使用this.$nextTick还有动画，所以使用计时器

      setTimeout(() => {
        this.form = {
          code: '',
          introduce: '',
          manager: '',
          name: '' }
      }, 200)
    },
    // 员工简单列表请求,获取下拉框里的数据
    async loadEmployeesList() {
      // 开启loading效果
      this.isLoading = true
      const res = await getEmployeesSimpleList()
      // 数据保存渲染
      this.EmployeesList = res
      // 关闭loading
      this.isLoading = false
    },
    // 点击确定增加子部门或修改部门详情

    async addIncreased() {
      try {
        // 点击确定正则也能生效
        await this.$refs.form.validate()
        // 判断是增加子部门还是修改部门详情
        if (this.form.id) {
          const { id, code, introduce, manager, name } = this.form
          // 修改部门详情请求
          await updateDepartment({
            id,
            code,
            introduce,
            manager,
            name
          })
          // 成功提示
          this.$message.success('修改成功')
        } else {
          // 给pid赋值父级部门ID如果点击的是上面的操作就没有id让他为空，一级本身就没有pid
          this.form.pid = this.row.id || ''
          // 发起增加请求
          await getIncreased(this.form)
          // 成功提示
          this.$message.success('添加成功')
        }
        // 页面刷新
        this.$emit('add-success')
        // 关闭弹层
        this.onClose()
      } catch (error) {
        console.log(error)
      }
    },
    // 点击查看部门在父组件调用
    setform() {
      // 采用深拷贝，把数据拷贝出来，互不干扰，要不然会有影响
      this.form = JSON.parse(JSON.stringify(this.row))
    }
  }
}
</script>

<style scoped>

</style>
