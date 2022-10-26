
import Vue from 'vue'
import Vuex from 'vuex'
import categoryMod from './Categoria/categoryMod'
import estoqueMod from './Estoque/estoqueMod'
import pedidoMod from './Pedido/pedidoMod'
import produtoMod from './Produtos/produtoMod'
import userMod from './User/userMod'
import clienteMod from './Cliente/clienteMod'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categoryMod,
    estoqueMod,
    pedidoMod,
    produtoMod,
    userMod,
    clienteMod
  },
  state: {
   
   
  
    header : [],
    delete : false,
    edit : false,
    filtro_selecionado : '',
    notTableFiltro : false,
    showRelatorio : false,
    itemGenerico : null,
  },
  getters: {
    getNotTableFiltro(state){
      return state.notTableFiltro
    },
    getGenerico(state){
      return state.itemGenerico
    },
    getHeader(state){
      return state.header
    },
    getFiltro(state){
      return state.filtro_selecionado
    },
   
    delete(state){
      return state.delete
    },
    edit(state){
      return state.edit
    },
   
    getRelatorio(state){
      return state.showRelatorio
    },
  },
  mutations: {
    saveGenerico(state, payload){
      state.itemGenerico = payload
    },
    setNotTableFiltro(state){
      state.notTableFiltro = true
    },
    disableNotTableFiltro(state){
      state.notTableFiltro = false
    },
    activeEdit(state){
      state.edit = true
    },
    disableEdit(state){
      state.edit = false
    },
    setCurrentPage(state, payload){
      state.current_page = payload 
    },
    setTotalPage(state, payload){
      state.total_page = payload
    },
    incrementCurrentPage(state){
      state.current_page += 1
    },
    setHeader(state,payload){
      state.header = payload
    },
    saveFiltro(state, payload){
      state.filtro_selecionado = payload
    },
    deleteFiltro(state){
      state.filtro_selecionado = ''
    },
    activeRelatorio(state){
      state.showRelatorio = true
    },
    desativeRelatorio(state){
      state.showRelatorio = false
    },
    activeDelete(state){
      state.delete = true
    },
    desativateDelete(state){
      state.delete = false
    },
    
  },
  actions: {
   
  },
})
