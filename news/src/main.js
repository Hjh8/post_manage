import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Axios from 'axios';

Vue.use(ViewUI);
Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$axios = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
