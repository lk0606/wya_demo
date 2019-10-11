import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import '../public/css/common.scss'
Vue.config.productionTip = false
import showModal from './plug-in/showmodal'
Vue.use(showModal)

import cTable from 'iscroll_table'
Vue.use(cTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
