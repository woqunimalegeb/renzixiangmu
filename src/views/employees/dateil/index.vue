<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="form" label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userForm" :rules="rules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userForm.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="userForm.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployeInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" :lazy="true">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" :lazy="true">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserInfo from '../components/user-info.vue'
import JobInfo from '../components/job-info.vue'
import { getEmployeeInfo, updateUserDetail } from '@/api/employees.js'
export default {
  name: 'Dateil',
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度至少6位', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.loadEmployeeInfo()
  },

  methods: {
    // 员工基本信息请求
    async loadEmployeeInfo() {
      const res = await getEmployeeInfo(this.$route.params.id)
      this.userForm = res
    },
    // 点击更新
    async updateEmployeInfo() {
      try {
        // 校验规则
        await this.$refs.form.validate()
        // 发送请求
        await updateUserDetail(this.userForm)
        this.$message.success('更新成功')
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
