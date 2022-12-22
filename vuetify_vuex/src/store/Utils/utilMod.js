import Service from "@/service/Service"

export default{
    namespaced: true,
    state: {
        itemGenerico : null,
        loadComponent : false,
        listaItens : null,
        listaGenerica : null,

    },
    getters: {
        getGenerico(state){
            return state.itemGenerico
        },
        getLoad(state){
            return state.loadComponent
        },
        getListaItens(state){
            return state.listaItens
        },
    },
    mutations: {
        SAVE_GENERICO(state, payload){
            state.itemGenerico = payload
        },
        SET_LISTA_ITENS(state, payload){
            state.listaItens = payload
        },
        SET_LOAD(state, payload){
            state.loadComponent = payload
        }
    },
    actions: {
        saveGenerico(context, payload){
            context.commit('SAVE_GENERICO', payload)
        },
        async  delete(context,payload){
            const text= Service.destroy(payload).then(()=>{
                return "Item Deletado com sucesso !"
            }).catch((error)=>{
                return "Error : " + error.response.data.message
            })
            return text
        },
        
       async getList(context , payload){
            let resposta = {current_page : null, totalPage : null, perPage : null}
            const resp = Service.getPaginado(payload).then(async (res)=>{
                if(res.data.data == undefined || res.data.data == null){
                    let arrayLista = null
                    arrayLista.push(res.data)
                    res.data.data = arrayLista
                }
                await context.dispatch("produtoMod/beginListProduct", res.data.data , { root: true })
                resposta.current_page = res.data.current_page
                resposta.totalPage = res.data.last_page
                resposta.perPage = res.data.per_page
                return resposta
            }).catch((error)=>{
                return error
            })
            console.log(resposta)
            return resp
        },

        refactorDates(context, payload){
            let obj = new Date(payload)
            return obj.toLocaleString()
        },
        async setListaItens(context, payload){
            const SetLista =  Service.get(payload).then(async(response)=>{
                if(payload.route == 'pedidos'){
                    response.data.forEach(async element => {
                        element.CREATED_AT = await context.dispatch('refactorDates', element.CREATED_AT)
                    }); 
                    context.commit('SET_LISTA_ITENS', response.data) 
                }
                else if(payload.route == 'vendas'){
                    if(response.data.dados == undefined || response.data.dados == null){
                        let payload = {}
                        payload.Despesas =  response.data.Despesas
                        payload.Lucro_Vendas =  response.data.Lucro_Vendas 
                        payload.Total = response.data.Total
                        payload.Saldo_Final =  response.data.Saldo_Final
                        payload.Funcionarios = response.data.Funcionarios
                        context.commit('SET_LISTA_ITENS', payload)
                    }else{
                        response.data.dados.vlTotal = response.data.vlTotal
                        console.log(response.data.dados)
                        context.commit('SET_LISTA_ITENS', response.data.dados) 
                    }
                }else{
                    context.commit('SET_LISTA_ITENS', response.data) 
                    
                }
                return response.data 
            }).catch((error)=>{
                return error
            })
            return SetLista
        },
        setLoad(context, payload){
            context.commit('SET_LOAD', payload)
        },
        setConfig(context, payload){
            payload.ESTADO == true ? "T" : "F"
           const data = Service.setConfig(payload).then((res)=>{
                return res.data.message
           }).catch((error)=>{
                return "Error : " + error.response.data.message
           })
           return data
        },
        getConfig(context, payload){
            const data = Service.getConfig(payload).then((res)=>{
                res.data.ESTADO == "1" ? true : false
                return res.data
            }).catch((error) =>{
                return error
            })
            return data
        }
    },
}