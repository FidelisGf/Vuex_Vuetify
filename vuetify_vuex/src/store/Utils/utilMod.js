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
            const resp = Service.get(payload).then(async (res)=>{
                await context.dispatch("produtoMod/beginListProduct", res.data.data , { root: true })
                resposta.current_page = res.data.current_page
                resposta.totalPage = res.data.last_page
                resposta.perPage = res.data.per_page
                return resposta
            }).catch((error)=>{
                return error
            })
            return resp
        },

        refactorDates(context, payload){
            let obj = new Date(payload)
            return obj.toLocaleString()
        },
        async setListaItens(context, payload){
            await Service.get(payload).then(async(response)=>{
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
                        context.commit('SET_LISTA_ITENS', payload)
                    }else{
                        response.data.dados.vlTotal = response.data.vlTotal
                        console.log(response.data.dados)
                        context.commit('SET_LISTA_ITENS', response.data.dados) 
                    }
                }else{
                    context.commit('SET_LISTA_ITENS', response.data) 
                } 
            }).catch((error)=>{
                return error
            })
        },
        setLoad(context, payload){
            context.commit('SET_LOAD', payload)
        }
    },
}