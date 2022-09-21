import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: ''
    }
  },
  getters: {
  },
  mutations: {
    saveUser(state, payload){
      state.user.username = payload
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
