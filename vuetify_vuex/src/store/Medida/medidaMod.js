import medidaService from "@/service/medidaService"
export default{
    namespaced: true,
    state: {
        listaMedidas : []
    },
    getters: {
        getMedidas(state){
            return state.listaMedidas
        }
    },
    mutations: {
        SET_LISTA_MEDIDAS(state , payload){
            state.listaMedidas = payload
        }
    },
    actions: {
        async getAll(context){
            medidaService.get().then((res)=>{
                context.commit("SET_LISTA_MEDIDAS", res.data.data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        async post(context, payload){
            const text = medidaService.post(payload).then((res)=>{
                context.dispatch("getAll");
                return res.data.message
            }).catch((error)=>{
                return "Erro :" + error.response.data.message  
            })
            return text
        } 
    },
}