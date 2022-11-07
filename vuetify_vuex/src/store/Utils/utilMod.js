export default{
    namespaced: true,
    state: {
        itemGenerico : null,
    },
    getters: {
        getGenerico(state){
            return state.itemGenerico
        },
    },
    mutations: {
        saveGenerico(state, payload){
            state.itemGenerico = payload
        },
    },
    actions: {
        saveGenerico(context, payload){
            context.commit('saveGenerico', payload)
        }
    },
}