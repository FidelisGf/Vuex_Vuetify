
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: ''
    },
    current_page: 1,
    total_page: 0,
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
    header : [],
    delete : false,
    edit : false,
    adicionaEstoque: false,
    filtro_selecionado : '',
    filtro_estoque: '',
    showRelatorioEstoque : false,
    showRelatorio : false,
    showListaRapidaProdutos : false,
    itemGenerico : null,
  },
  getters: {
    listCategorias(state){
      return state.Categorias
    },
    getGenerico(state){
      return state.itemGenerico
    },
    getCurrentPage(state){
      return state.current_page
    },
    getTotalPage(state){
      return state.total_page
    },
    getHeader(state){
      return state.header
    },
    getListRapidaProdutos(state){
      return state.showListaRapidaProdutos
    },
    getFiltro(state){
      return state.filtro_selecionado
    },
    getFiltroEstoque(state){
      return state.filtro_estoque
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
    getRelatorioEstoque(state){
      return state.showRelatorioEstoque
    },
    getAdicionaEstoque(state){
      return state.adicionaEstoque
    }
  },
  mutations: {
    saveGenerico(state, payload){
      state.itemGenerico = payload
    },
    activeEdit(state){
      state.edit = true
    },
    disableEdit(state){
      state.edit = false
    },
    saveFiltroEstoque(state, payload){
      state.filtro_estoque = payload
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
    deleteFiltroEstoque(state){
      state.filtro_estoque = ''
    },
    saveFiltro(state, payload){
      state.filtro_selecionado = payload
    },
    deleteFiltro(state){
      state.filtro_selecionado = ''
    },
    activeRelatorioEstoque(state){
      state.showRelatorioEstoque = true
    },
    desativeRelatorioEstoque(state){
      state.showRelatorioEstoque = false
    },
    activeListaRapidaProdutos(state){
      state.showListaRapidaProdutos = true
    },
    desativeListaRapidaProdutos(state){
      state.showListaRapidaProdutos = false
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
    activeDelete(state){
      state.delete = true
    },
    desativateDelete(state){
      state.delete = false
    },
    activeAdicionaEstoque(state){
      state.adicionaEstoque = true
    },
    desativateAdicionaEstoque(state){
      state.adicionaEstoque = false
    },
    // onPageChange(state, payload){
      
    // }
  },
  actions: {
    setUser(context, payload){
      context.commit('saveUser', payload)
      console.log(payload);
    },
    saveListCategoria(context, payload){
      context.commit('saveListCategoria', payload)
    },
    
   
  },
  modules: {
  }
})
