import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Axios from 'axios';
// 城市级联选择
import Distpicker from 'v-distpicker'
import echarts from 'echarts'

Vue.component('v-distpicker', Distpicker)

Vue.use(ViewUI);
Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://47.115.46.57:3333/'
// Axios.defaults.baseURL = 'http://localhost:3333/'
Vue.prototype.$axios = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
