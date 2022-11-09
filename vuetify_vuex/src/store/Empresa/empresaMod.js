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
            let resp = null
            try {
                await empresaService.checaEmpresa().then((res)=>{
                    resp = res.data                    
                })
                return resp
            } catch (error) {
                return resp
            }
        },
        async getByUser(){
            let data = null
            try {
                await empresaService.findByUser().then((res)=>{
                   data = res.data[0]
                })
                return data
            } catch (error) {
                return data
            }
        }
    },
}