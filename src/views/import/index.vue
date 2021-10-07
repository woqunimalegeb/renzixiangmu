<template>
  <div>
    <upload-excel :on-success="onSuccess" />

  </div>
</template>

<script>
import { importEmployees } from '@/api/employees'

export default {
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    onSuccess({ results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const excelArr = results.map(item => {
        const obj = {}
        Object.keys(item).forEach(key => {
          if (key === '入职日期' || key === '转正日期') {
            obj[userRelations[key]] = this.formatDate(item[key], '/')
            return false
          }

          obj[userRelations[key]] = item[key]
        })

        return obj
      })
      importEmployees(excelArr)
      this.$message.success('导入成功')
      this.$router.back
    }

  }
}
</script>

<style scoped>

</style>

