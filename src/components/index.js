import PageTools from '@/components/PageTools'
import UploadExecl from '@/components/UploadExecl'
import UploadImage from '@/components/UploadImage'

export default {
// Vue.use内部会解析一个对象里面有install
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExecl', UploadExecl)
    Vue.component('UploadImage', UploadImage)
  }

}
