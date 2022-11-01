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
            await medidaService.get().then((res)=>{
                context.commit("setListMedidas", res.data.data)
            })
        },
        async post(context, payload){
            try {
                await medidaService.post(payload).then(()=>{
                    context.dispatch("getAll");
                })
            } catch (error) {
                alert('Falha ao Cadastrar Medida')
            }          
        } 
    },
}