import Vue from 'vue'
import * as directives from './derectives'
console.log(directives)
Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})
// 注册自定义指令
