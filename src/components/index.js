import PageTools from './PageTools/index.vue'
import UploadExcel from './Uploadexcel/index.vue'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
