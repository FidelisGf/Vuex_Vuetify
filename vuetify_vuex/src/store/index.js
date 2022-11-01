
import Vue from 'vue'
import Vuex from 'vuex'
import categoryMod from './Categoria/categoryMod'
import estoqueMod from './Estoque/estoqueMod'
import pedidoMod from './Pedido/pedidoMod'
import produtoMod from './Produtos/produtoMod'
import userMod from './User/userMod'
import clienteMod from './Cliente/clienteMod'
import tagMod from './Tag/tagMod'
import despesaMod from './Despesa/despesaMod'
import utilMod from './Utils/utilMod'
import medidaMod from './Medida/medidaMod'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categoryMod,
    estoqueMod,
    pedidoMod,
    produtoMod,
    userMod,
    clienteMod,
    tagMod,
    despesaMod,
    utilMod,
    medidaMod
  },
  state: {
   
   
  
   
    edit : false,
   
   
  },
  getters: {
   
   
   
    delete(state){
      return state.delete
    },
    edit(state){
      return state.edit
    },
   
   
  },
  mutations: {
   
    activeEdit(state){
      state.edit = true
    },
    disableEdit(state){
      state.edit = false
    },
    
   
    
  },
  actions: {
   
  },
})
