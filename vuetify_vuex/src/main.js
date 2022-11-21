import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask';
import '@/service/Service'
import '@/plugins/axios'
Vue.config.productionTip = false
Vue.use(VueMask);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
