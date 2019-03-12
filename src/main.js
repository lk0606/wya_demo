import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import '../public/css/common.scss'
Vue.config.productionTip = false
import showModal from './plug-in/showmodal'
Vue.use(showModal)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
