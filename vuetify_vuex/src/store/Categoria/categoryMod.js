import categoryService from "@/service/categoryService"
export default {
    namespaced: true,
    state: {       
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
        BEGIN_LIST_CATEGORIA(state, payload){
            state.Categorias = payload
        },
    },
    actions: {
        beginListCategoria(context){
            categoryService.get().then((res)=>{
                context.commit("BEGIN_LIST_CATEGORIA",res.data)
            })
        },
        async saveListCategoria(context, payload){
            const text = categoryService.postCategory(payload).then((res)=>{
                context.dispatch('beginListCategoria')
                return res.data.message
            }).catch((error)=>{
                return "Erro :" + error.response.data.message
            })
            return text
        }
    } 
}       