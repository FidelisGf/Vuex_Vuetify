export default{
    namespaced: true,
    state: {
       showCadastro : false
    },
    getters: {
       getModalCadastro(state){
            return state.showCadastro
       }
    },
    mutations: {
       activeModalCadastro(state){
            state.showCadastro = true
       },
       disableModalCadastro(state){
            state.showCadastro = false
       }
    },
    actions: {
       activeMod(context){
            context.commit("activeModalCadastro")
       },
       disableModalCadastro(context){
            context.commit("disableModalCadastro")
       },
    },
}