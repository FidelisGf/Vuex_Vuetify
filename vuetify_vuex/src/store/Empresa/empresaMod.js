import empresaService from "@/service/empresaService"
export default{
    namespaced: true,
    state: {
        
    },
    getters: {
       
    },
    mutations: {
        
    },
    actions: {
        async checkEmpresa(){
            const resp = empresaService.checaEmpresa().then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return resp
        },
        async getByUser(){
            const data = empresaService.findByUser().then((res)=>{
                return res.data[0]
            }).catch((error)=>{
                return error
            })
            return data
        }
    },
}