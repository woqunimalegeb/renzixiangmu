// 将自定义事件封装
import Vue from 'vue'
import * as directives from './derectives.js'

// 注册自定义事件，判断图片是否加载失败

Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})
