import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementUi from 'element-ui'
import TitleItem from './components/TitleItem.vue'

import './assets/theme-chalk/index.css'
import './assets/scss/index.scss'
import { format } from './filter/index'

Vue.component('title-item', TitleItem)
Vue.use(ElementUi)
Vue.filter('format', format)
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default app