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
                context.commit("beginListCategoria",res.data)
            })
        },
        async saveListCategoria(context, payload){
            let text = ""
            try {
              await categoryService.postCategory(payload).then(async (res) => {
                    text = await res.data.message
                    context.dispatch('beginListCategoria')
                }) 
            return text      
            }catch(error) {
                text = "Erro :" + error.response.data.message
                return text
            }
        }
    } 
}       