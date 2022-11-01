import estoqueService from '@/service/estoqueService'
export default{
    namespaced: true,
    state: {
        adicionaEstoque: false,
        showRelatorioEstoque : false,
        filtro_estoque: '',

    },
    getters: {
        getFiltroEstoque(state){
            return state.filtro_estoque
        },
        getRelatorioEstoque(state){
            return state.showRelatorioEstoque
        },
        getAdicionaEstoque(state){
            return state.adicionaEstoque
        }    
    },
    mutations: {
        saveFiltroEstoque(state, payload){
            state.filtro_estoque = payload
        },
        activeRelatorioEstoque(state){
            state.showRelatorioEstoque = true
        },
        desativeRelatorioEstoque(state){
            state.showRelatorioEstoque = false
        },
        deleteFiltroEstoque(state){
            state.filtro_estoque = ''
        },
        activeAdicionaEstoque(state){
            state.adicionaEstoque = true
        },
        desativateAdicionaEstoque(state){
            state.adicionaEstoque = false
        },
    },
    actions: {
        saveFiltroEstoque(context, payload){
            context.commit('saveFiltroEstoque', payload)
        },
        activeRelatorioEstoque(context){
            context.commit('activeRelatorioEstoque')
        },
        desativeRelatorioEstoque(context){
            context.commit('desativeRelatorioEstoque')
        },
        deleteFiltroEstoque(context){
            context.commit('deleteFiltroEstoque')
        },
        activeAdicionaEstoque(context){
            context.commit('activeAdicionaEstoque')
        },
        desativateAdicionaEstoque(context){
            context.commit('desativateAdicionaEstoque')
        },
       async  saveQuantidade(context, payload){
            let text = null
            try { 
                await estoqueService.adicionarQuantidade(payload).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        context.commit("desativateAdicionaEstoque");
                        text = "Sucesso : Quantidade adicionada ao estoque !"
                    }
                });
                return text
            } catch (error) {
                text = "Erro : " + error.response.data.message
                return text
            }
          
        }
    },
}