
import Vue from 'vue'
import Vuex from 'vuex'
import categoryMod from './Categoria/categoryMod'
import estoqueMod from './Estoque/estoqueMod'
import pedidoMod from './Pedido/pedidoMod'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categoryMod,
    estoqueMod,
    pedidoMod
  },
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
    Products : [],
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
    listProducts(state){
      return state.Products
    },
    delete(state){
      return state.delete
    },
    edit(state){
      return state.edit
    },
    getProduct(state){
      return state.product
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
    saveUser(state, payload){
      state.user.username = payload
    },
    saveProduct(state, payload){
      state.product = payload
    },
    beginListProduct(state, payload){
       state.Products = payload
    },
    clearListProduct(state){
      state.Products.length = 0
    },
    saveListProduct(state, payload){
      state.Products.push(payload)
    },
    editListProduct(state, payload){
      state.Products =  state.Products.filter(item => item.ID_PRODUTO !== payload.ID_PRODUTO)
      state.Products.push(payload)
    },
    deleteInListProduct(state, payload){
      state.Products =  state.Products.filter(item => item.ID_PRODUTO !== payload)
    },
    activeDelete(state){
      state.delete = true
    },
    desativateDelete(state){
      state.delete = false
    },
    
  },
  actions: {
    setUser(context, payload){
      context.commit('saveUser', payload)
      console.log(payload);
    },
  },
})
