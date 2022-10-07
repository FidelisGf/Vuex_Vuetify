
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: ''
    },
    product: {
      ID_PRODUTO : '',
      NOME : '',
      DESC : '',  
      VALOR : 0,
      quantia_inicial : 0,
      category: {
        ID_CATEGORIA : null,
        NOME : ''
      },
    },
    Categorias : [],
    Products : [],
    deleteProduct : false
  },
  getters: {
    listCategorias(state){
      return state.Categorias
    },
    listProducts(state){
      return state.Products
    },
    deleteProduct(state){
      return state.deleteProduct
    },
    getProduct(state){
      return state.product
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
       state.Categorias = payload
    },
    beginListProduct(state, payload){
       state.Products = payload
    },
    clearListCategoria(state){
        state.Categorias.length = 0
    },
    clearListProduct(state){
      state.Products.length = 0
    },
    saveListCategoria(state, payload){
      state.Categorias.push(payload)
    },
    saveListProduct(state, payload){
      state.Products.push(payload)
    },
    deleteInListProduct(state, payload){
      state.Products =  state.Products.filter(item => item.ID_PRODUTO !== payload)
    },
    activeDeleteProduct(state){
      state.deleteProduct = true
    },
    desativateDeleteProduct(state){
      state.deleteProduct = false
    },
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
