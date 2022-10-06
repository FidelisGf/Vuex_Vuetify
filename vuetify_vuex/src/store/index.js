
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
      VALOR : 0,
      quantia_inicial : 0,
      category: {
        ID_CATEGORIA : null,
        NOME : ''
      },
    },
    Categorias : []
  },
  getters: {
    listCategorias(state){
        return state.Categorias
    }
  },
  mutations: {
    saveUser(state, payload){
      state.user.username = payload
    },
    saveProduct(state, payload){
      state.product = payload
    },
    beginListCategoria(state, payload){
      payload.forEach(element => {
        state.Categorias.push(element)
      });
    },
    saveListCategoria(state, payload){
      state.Categorias.push(payload)
    }
  },
  actions: {
    setUser(context, payload){
      context.commit('saveUser', payload)
      console.log(payload);
    },
    saveListCategoria(context, payload){
      context.commit('saveListCategoria', payload)
    }
  },
  modules: {
  }
})
