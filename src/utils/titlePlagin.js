import localizeFilter from '../filters/localizeFilter'

export default {
  install (Vue) {
    Vue.prototype.$title = function (titleKey) {
      const appName = 'CRM'
      return `${localizeFilter(titleKey)} | ${appName}`
    }
  }
}
