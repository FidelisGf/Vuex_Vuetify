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
        SET_VALUE_PER_MES(state, payload){
            state.valuesPerMes = payload
        }
    },
    actions: {
        async getVendas(context){
            let qntd = 0
            const res = vendasService.getVendasByDia().then((res)=>{
                    context.commit("SET_VALUE_PER_MES", res.data.values)
                    return res.data
            }).catch((error)=>{
                console.log(error)
            }) 
            qntd = res.quantidade
            return qntd
        },
        async  getVendasUltimosTresMeses(){
            const res = vendasService.getTotalVendasUltimosTresMeses().then((res)=>{
                return res.data[0]
            }).catch((error)=>{
                console.log(error)
            })
            return res
        }
    },
}