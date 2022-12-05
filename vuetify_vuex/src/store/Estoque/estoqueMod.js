import estoqueService from '@/service/estoqueService'
export default{
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
       async  saveQuantidade(context, payload){
            const text = estoqueService.adicionarQuantidade(payload).then((res)=>{
                if(res.status == 200){
                    return res.data.message
                }
            }).catch((error)=>{
                return "Erro : " + error.response.data.message
            })
            return text
        }
    },
}