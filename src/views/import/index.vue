<template>
  <div>
    <UploadExecl :on-success="onSuccess" />
  </div>
</template>

<script>
import { AddEmployeeAll } from '@/api/employees.js'
import { formatDate } from '@/utils'
export default {
  data() {
    return {

    }
  },

  created() {

  },

  methods: {
    async onSuccess({ results }) {
      // 提前定义，否则需要判断
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // map循环数组，处理数据格式，长度与之前的数组长度一致，return什么就会返回什么
      const execlArr = results.map(item => {
        const obj = {}
        Object.keys(item).forEach(key => {
          // 判断是否是需要转换日期的，必须return，结束这次循环
          if (key === '入职日期' || key === '转正日期') {
            obj[userRelations[key]] = formatDate(item[key], '/')
            return
          }
          // 循环数组将key替换成我们需要的名字
          // 相当于obj['timeOfEntry']=item['入职日期']
          obj[userRelations[key]] = item[key]
        })
        return obj

      //   return {
      //     username: item['姓名'],
      //     mobile: item['手机号'],
      //     workNumber: item['工号'],
      //     timeOfEntry: item['入职日期'],
      //     correctionTime: item['转正日期']
      //   }
      })
      console.log(execlArr)
      // 导入请求,处理后的数据传入
      await AddEmployeeAll(execlArr)

      this.$message.success('导入成功')
      // 跳转上一页
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
