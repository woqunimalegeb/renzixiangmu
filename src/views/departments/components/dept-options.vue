<template>
  <el-row>
    <el-col :span="20">
      <span class="company_tit">{{ row.name }}</span>
    </el-col>
    <el-col :span="4" class="company_option">
      <span>{{ row.manager }}</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$emit('click-add',row)">添加子部门</el-dropdown-item>
          <el-dropdown-item v-if="!isRoot">查看部门</el-dropdown-item>
          <el-dropdown-item v-if="!isRoot" @click.native="delDepts">删除部门</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptById } from '@/api/department'
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
    delDepts() {
      this.$confirm('此操作将永久删除该部门，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delDeptById(this.row.id)
        this.$message.success('删除成功')
        this.$emit('ondel')
      }).catch(() => {
        console.log('点击取消')
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.el-row{
  width: 100%;
  }
 .company_tit{
    font-size: 14px;
    font-weight: bold;
  }
  .company_option{
  display: flex;
  justify-content: flex-end;
  span:nth-child(1){
    margin-right: 10px;
  }
}
</style>
