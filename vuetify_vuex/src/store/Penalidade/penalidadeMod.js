import penalidadeService from "@/service/penalidadeService"

export default{
    namespaced: true,
    state: {
       
    },
    getters: {
       
    },
    mutations: {
      
    },
    actions: {
        async postPenalidade(context, payload){
            const text = penalidadeService.post(payload).then((res)=>{
                return res.data.message
            }).catch((error)=>{
                return "Error : " + error.response.data.message
            })
            return text
        },
        async getTotalDescontoMes(context , payload){
            const total = penalidadeService.getValorDescontoMes(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return total
        }
    },
}