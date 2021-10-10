<template>
  <el-row>
    <el-col :span="20">
      <span class="company-tiy">{{ row.name }}</span>
    </el-col>
    <el-col class="company-option" :span="4">
      <span>{{ row.manager }}</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$emit('click-add',row)">添加子部门</el-dropdown-item>
          <el-dropdown-item v-if="!isRoot" @click.native="$emit('click-edit',row)">查看部门</el-dropdown-item>
          <el-dropdown-item v-if="!isRoot" @click.native="delDepts">删除部门</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptById } from '@/api/department.js'
export default {
  props: {
    row: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    // 点击删除
    delDepts() {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 删除请求
        await delDeptById(this.row.id)
        // 删除成功提示
        this.$message.success('删除成功')
        // 删除成功刷新页面
        this.$emit('ondel')
        console.log(1)
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.el-row{
  width: 100%;
}
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
</style>
