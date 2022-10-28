export default{
    namespaced: true,
    state: {
        header : [],
        delete : false,
        itemGenerico : null,
        filtro_selecionado : '',
        notTableFiltro : false,
        showRelatorio : false,
    },
    getters: {
        getFiltro(state){
            return state.filtro_selecionado
        },
        getNotTableFiltro(state){
            return state.notTableFiltro
        },
        getGenerico(state){
            return state.itemGenerico
        },
        getHeader(state){
            return state.header
        },
        getRelatorio(state){
            return state.showRelatorio
        },
        delete(state){
            return state.delete
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
        activeDelete(state){
            
            state.delete = true
           
        },
        desativateDelete(state){
            state.delete = false
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
    },
    actions: {
        saveFiltro(context, payload){
            context.commit('saveFiltro', payload)
        },
        deleteFiltro(context){
            context.commit('deleteFiltro')
        },
        activeRel(context){
            context.commit('activeRelatorio')
        },
        desativeRelatorio(context){
            context.commit('desativeRelatorio')
        },
        setHeader(context, payload){
            context.commit('setHeader', payload)
        },
        saveGenerico(context, payload){
            context.commit('saveGenerico', payload)
        },
        setNotTableFiltro(context){
            context.commit('setNotTableFiltro')
        },
        disableNotTableFiltro(context){
            context.commit('disableNotTableFiltro')
        },
        activeDelete(context){
            
            context.commit('activeDelete')
        },
        desativateDelete(context){
            context.commit('desativateDelete')
        }
    },
}