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
            let text = ''
            try {
                await penalidadeService.post(payload).then((res)=>{
                    text = res.data.message
                })
                return text
            } catch (error) {
                text = "Error : " + error.response.data.message
                return text
            }
        }
    },
}