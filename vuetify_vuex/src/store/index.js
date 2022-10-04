import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: ''
    },
    product: {
      NOME : '',
      DESC : '',
      CATEGORIA : '',
      VALOR : 0,
      quantia_inicial : 0,
    }
  },
  getters: {
  },
  mutations: {
    saveUser(state, payload){
      state.user.username = payload
    },
    saveProduct(state, payload){
      state.product = payload
    }
  },
  actions: {
    setUser(context, payload){
      context.commit('saveUser', payload)
      console.log(payload);
      
    }
  },
  modules: {
  }
})
