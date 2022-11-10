import axios from "axios"

export default{
    namespaced: true,
    state: {
        itemGenerico : null,
        loadComponent : false,
        listaItens : null,

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
        }
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
                console.log(formatData)
                return formatData
        },
        async setListaItens(context, payload){
            try {
                    await axios.get("http://127.0.0.1:8000/api/" + payload.route,  { params: { opcao: payload.opcao, start : payload.dtStart, end : payload.dtFinal, pdf : payload.pdf} }).then(async (response) => {
                        if(payload.route == 'pedidos'){
                            response.data.forEach(async element => {
                                element.CREATED_AT = await context.dispatch('refactorDates', element.CREATED_AT)
                            }); 
                            context.commit('setListaItens', response.data) 
                        }
                        else if(payload.route == 'vendas'){
                            response.data.dados.vlReal = await response.data.vlReal
                            response.data.dados.vlDiff = await response.data.vlDiff
                            response.data.dados.vlTotal = await response.data.vlTotal
                            console.log(response.data.dados)
                            context.commit('setListaItens', response.data.dados) 
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