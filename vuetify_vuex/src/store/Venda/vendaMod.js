import vendasService from "@/service/vendasService"

export default{
    namespaced: true,
    state: {
       valuesPerMes : []
    },
    getters: {
        getValuesPerMes(state){
            return state.valuesPerMes
        }
    },
    mutations: {
        setValuesPerMes(state, payload){
            state.valuesPerMes = payload
        }
    },
    actions: {
        async getVendas(context){
            try {
                await vendasService.getVendasByMes().then((res)=>{
                    console.log(res)
                    context.commit("setValuesPerMes", res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
}