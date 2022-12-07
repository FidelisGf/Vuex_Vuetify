import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask';
import '@/service/Service'
import '@/plugins/axios'
import execute from '@/plugins/axios'
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs);
Vue.use(VueMask);
Vue.config.productionTip = false
execute()
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
