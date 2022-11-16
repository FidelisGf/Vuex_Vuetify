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
        saveGenerico(state, payload){
            state.itemGenerico = payload
        },
        setListaItens(state, payload){
            state.listaItens = payload
        },
        setLoad(state, payload){
            state.loadComponent = payload
        }
    },
    actions: {
        saveGenerico(context, payload){
            context.commit('saveGenerico', payload)
        },
         
        
       async getList(context , payload){
            let resposta = {current_page : null, totalPage : null, perPage : null}
            try {
                await Service.get(payload).then(async (res)=>{
                    console.log(res.data)
                    await context.commit("produtoMod/beginListProduct", res.data.data , { root: true })
                    resposta.current_page = res.data.current_page
                    resposta.totalPage = res.data.last_page
                    resposta.perPage = res.data.per_page
                })
                console.log(resposta)
                return resposta 
            } catch (error) {
                return undefined
            }
        },

        refactorDates(context, payload){
                console.log(payload)
                let obj = new Date(payload)
                let day = obj.getDate()
                let month = obj.getMonth()
                month = parseInt(month + 1)
                let year = obj.getFullYear()
                let hour = obj.getHours()
                let minu = obj.getMinutes()
                let formatData  = day + "/" + month+ "/" + year + ": " + hour + ":" + minu ;
                return formatData
        },
        async setListaItens(context, payload){
            try {
                    await Service.get(payload).then(async (response) => {
                        if(payload.route == 'pedidos'){
                            response.data.forEach(async element => {
                                element.CREATED_AT = await context.dispatch('refactorDates', element.CREATED_AT)
                            }); 
                            context.commit('setListaItens', response.data) 
                        }
                        else if(payload.route == 'vendas'){
                            if(response.data.dados == undefined || response.data.dados == null){
                                let payload = {}
                                payload.Despesas = await response.data.Despesas
                                payload.Lucro_Vendas = await response.data.Lucro_Vendas 
                                payload.Total = await response.data.Total
                                payload.Saldo_Final = await response.data.Saldo_Final
                                context.commit('setListaItens', payload)
                            }else{
                                response.data.dados.vlReal = await response.data.vlReal
                                response.data.dados.vlDiff = await response.data.vlDiff
                                response.data.dados.vlTotal = await response.data.vlTotal
                                console.log(response.data.dados)
                                context.commit('setListaItens', response.data.dados) 
                            }
                          
                        }else{
                            context.commit('setListaItens', response.data) 
                        }
                        
                        
                    });
            } catch (error) {
                return error
            }
           
        },
        setLoad(context, payload){
            context.commit('setLoad', payload)
        }
    },
}