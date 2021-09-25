<template>
  <el-dialog
    title="添加部门"
    :visible="showDialog"
    width="50%"
    @close="onClose"
  >
    <el-form ref="form" label-width="100px">
      <el-form-item label="部门名称">
        <el-input />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input />
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-form></el-dialog>
</template>

<script>
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
    return {

    }
  },

  created() {

  },

  methods: {
    onClose() {
      this.$emit('update:show-dialog', false)
    }
  }
}
</script>

<style scoped>

</style>
