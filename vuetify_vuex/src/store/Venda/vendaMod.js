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
            let qntd = 0
            try {
                await vendasService.getVendasByDia().then((res)=>{
                    console.log(res)
                    context.commit("setValuesPerMes", res.data.values)
                    qntd = res.data.quantidade
                })
                return qntd
            } catch (error) {
                console.log(error)
                return qntd
            }
        },
        async  getVendasUltimosTresMeses(){
            let values = []
          
            await vendasService.getTotalVendasUltimosTresMeses().then((res)=>{
                values = res.data[0]
            })
            return values
          
           
            
        }
    },
}