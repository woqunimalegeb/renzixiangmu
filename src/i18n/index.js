import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import Cookie from 'js-cookie'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(Vuei18n)
const i18n = new Vuei18n({
  locale: Cookie.get('lang') || 'zh',
  messages: {
    zh: {
      ...zh,
      ...zhLocale
    },
    en: {
      ...en,
      ...enLocale
    }
  }
})
export default i18n
