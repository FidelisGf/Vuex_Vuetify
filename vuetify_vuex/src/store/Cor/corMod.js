import CorService from "@/service/CorService"

export default{
    namespaced: true,
    state: {
       
    },
    getters: {
       
    },
    mutations: {
      
    },
    actions: {
       postCor(context, payload){
            const data = CorService.post(payload).then((res)=>{
                return res.data.message
            }).catch((error)=>{
                return error
            })
            return data
       }
    },
}