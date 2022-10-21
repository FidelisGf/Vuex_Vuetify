import categoryService from "@/service/categoryService"
export default {
    namespaced: true,
    state: {
        Teste : 'Normal',
        Categorias : [],
    },
    getters: {
        getTeste(state){
            return state.Teste
        },
        listCategorias(state){
            return state.Categorias
        },
    },
    mutations: {
        saveTest(state){
            state.Teste = 'Mudou'
        },
        beginListCategoria(state, payload){
            state.Categorias = payload
        },
        clearListCategoria(state){
            state.Categorias.length = 0
        },
    },
    actions: {
        beginListCategoria(context){
            categoryService.get().then((res)=>{
                context.commit("beginListCategoria",res.data.data)
            })
        },
        saveListCategoria(context, payload){
            categoryService.postCategory(payload).then((res) => {
                console.log(res);
                alert('Categoria criada com sucesso ! ')
            })
            context.dispatch('beginListCategoria')
        }
    },
}