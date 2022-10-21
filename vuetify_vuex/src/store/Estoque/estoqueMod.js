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
        saveQuantidade(context, payload){
            estoqueService.adicionarQuantidade(payload).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    alert("Quantidade Adicionada com sucesso !");
                    context.commit("desativateAdicionaEstoque");
                }
            });
        }
    },
}