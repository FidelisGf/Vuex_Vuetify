
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
import materiaMod from './Materia/materiaMod'
import empresaMod from './Empresa/empresaMod'
import vendaMod from './Venda/vendaMod'
import createPersistedState from "vuex-persistedstate"
import penalidadeMod from './Penalidade/penalidadeMod'
import corMod from './Cor/corMod'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    categoryMod,
    estoqueMod,
    empresaMod,
    pedidoMod,
    produtoMod,
    userMod,
    clienteMod,
    tagMod,
    despesaMod,
    utilMod,
    medidaMod,
    materiaMod,
    vendaMod,
    penalidadeMod,
    corMod
  },
  
  state: {
    loading : false
  },
  plugins: [
    
    createPersistedState({
    
      paths: ['userMod'],
    }),
  ],
  getters: {
      loading(state){
        
        return state.loading
      }
    
  },
  mutations: {
    setLoading(state, payload){
        state.loading = payload
    }
  },
  actions: {
    setLoading(context, payload){
        context.commit("setLoading", payload)
    }
  },
})
