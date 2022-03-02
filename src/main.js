import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import Loader from './components/Loader'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import Currency from './filters/CurrencyFilter'
import dateFilter from './filters/dateFilter'
import localizeFilter from './filters/localizeFilter'
import tooltip from './views/CRM/CRMDirectives/tooltip'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import messagePlagin from './utils/messagePlagin'
import titlePlagin from './utils/titlePlagin'

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.filter('currencyFilter', Currency)
Vue.filter('dateFilter', dateFilter)
Vue.filter('localizeFilter', localizeFilter)
Vue.directive('tooltip', tooltip)
Vue.use(messagePlagin)
Vue.use(titlePlagin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyAJDUP5SsZGx6LX-l61WUa0NMqoB9xXTGk',
  authDomain: 'my-first-project-68122.firebaseapp.com',
  projectId: 'my-first-project-68122',
  storageBucket: 'my-first-project-68122.appspot.com',
  messagingSenderId: '339451450063',
  appId: '1:339451450063:web:47c0381fab315e91a45dba',
  measurementId: 'G-FEDVTMN6EZ'
}
firebase.initializeApp(config)

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
