import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)// 导入所有文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
