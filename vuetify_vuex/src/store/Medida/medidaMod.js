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
        setListMedidas(state , payload){
            state.listaMedidas = payload
        }
    },
    actions: {
        async getAll(context){
            medidaService.get().then((res)=>{
                context.commit("setListMedidas", res.data.data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        async post(context, payload){
            let text = ""
            try {
                await medidaService.post(payload).then(async (res)=>{
                    text = await res.data.message
                    console.log(text)
                    context.dispatch("getAll");
                })
                return text
            } catch (error) {
                text = "Erro ao cadastrar Medida"
                return text
            }          
        } 
    },
}