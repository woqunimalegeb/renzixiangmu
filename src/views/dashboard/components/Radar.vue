<template>
  <div id="main">
    雷达图
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {

    }
  },

  created() {

  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const myChart = echarts.init(document.getElementById('main'))
      const option = {
        title: {
          text: '胡娟请假理由'
        },
        legend: {
          data: ['胡娟', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '生病', max: 100 },
            { name: '懒', max: 100 },
            { name: '刷剧', max: 100 },
            { name: '来姨妈', max: 100 },
            { name: '走亲戚', max: 100 },
            { name: '没事找事', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [20, 100, 80, 20, 40, 100],
                name: '胡娟'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang='scss'>
#main{
 width: 500px;
  height: 500px;
}
</style>
