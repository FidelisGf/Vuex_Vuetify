import pedidoService from "@/service/pedidoService"
import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
        pedidos: [],
        valor_Total_Pedidos : 0,
        showListaPedidos : false,
        showListaRapidaProdutos : false,

    },
    getters: {
        ListaPedidos(state){
            return state.showListaPedidos
        },
        getValorTotal(state){
            return state.valor_Total_Pedidos
        },
        getPedidos(state){
            return state.pedidos
        },
        getListRapidaProdutos(state){
            return state.showListaRapidaProdutos
        },
    },
    mutations: {
        activeListaRapidaProdutos(state){
            state.showListaRapidaProdutos = true
        },
        desativeListaRapidaProdutos(state){
            state.showListaRapidaProdutos = false
        },
        saveValorTotal(state,payload){
            state.valor_Total_Pedidos = parseFloat(payload)
        },
        savePedidos(state, payload){
            const exist = state.pedidos.find(o => o.id == payload.id)
            if(exist){
              exist.quantidade += parseInt(payload.quantidade)
            }else{
              state.pedidos.push(payload)
            }
        },
        removePedido(state, payload){
            state.valor_Total_Pedidos -= parseFloat(payload.valor)
            state.pedidos = state.pedidos.filter(o => o.id !== payload.id)
        },
        limpaPedido(state){
            state.pedidos = []
        },
        limparValorTotal(state){
            state.valor_Total_Pedidos = 0
        },
        somaItens(state, payload){
            state.valor_Total_Pedidos += parseFloat(payload)
        },
        removeQntdPedido(state, payload){
            const exist = state.pedidos.find(o => o.id == payload.id)
            if(exist){
              exist.quantidade = payload.quantidade
            }
        },
        activeListaPedidos(state){
            state.showListaPedidos = true
        },
        disableListaPedidos(state){
            state.showListaPedidos = false
        },
    },
    actions: {
        saveValorTotal(context, payload){
            context.commit('saveValorTotal',payload)
        },
        savePedidos(context, payload){
            context.commit('savePedidos', payload)
        },
        removePedido(context, payload){
            context.commit('removePedido', payload)
        },
        removeQntdPedido(context, payload){
            context.commit('removeQntdPedido', payload)
        },
        findProduto(context ,payload){
           let getProduto =  productService.findProdutoById(payload.id).then((res)=>{
                if(res.status == 200){
                    this.fail = false
                    let payload2 = {id : res.data.ID_PRODUTO, nome : res.data.NOME, valor : res.data.VALOR, quantidade : payload.quantidade}
                    context.commit('somaItens', res.data.VALOR)
                    context.commit("savePedidos", payload2) 
                    console.log(payload)
                    return true
                }else{
                    return false
                }
            }) 
            return getProduto
        },
        geraVenda(context, payload){
          let gera = pedidoService.save(payload).then((res)=>{
                if(res.status == 200){
                    context.commit("limpaPedido")
                    context.commit("limparValorTotal")
                    return true
                }else if(res.status != 200){
                   return false
                }
            })
            return gera
        }
    },
}