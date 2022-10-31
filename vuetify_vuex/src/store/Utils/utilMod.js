export default{
    namespaced: true,
    state: {
        header : [],
        delete : false,
        itemGenerico : null,
    },
    getters: {
        getGenerico(state){
            return state.itemGenerico
        },
        getHeader(state){
            return state.header
        },
        delete(state){
            return state.delete
        }, 
    },
    mutations: {
        saveGenerico(state, payload){
            state.itemGenerico = payload
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
    },
    actions: {
        setHeader(context, payload){
            context.commit('setHeader', payload)
        },
        saveGenerico(context, payload){
            context.commit('saveGenerico', payload)
        },
        activeDelete(context){
            context.commit('activeDelete')
        },
        desativateDelete(context){
            context.commit('desativateDelete')
        }
    },
}