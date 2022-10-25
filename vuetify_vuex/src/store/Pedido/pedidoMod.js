import pedidoService from "@/service/pedidoService"
import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
        pedidos: [],
        valor_Total_Pedidos : 0,
        showListaPedidos : false,
        showListaRapidaProdutos : false,
        cod : null,
        pedidoAtual : {
            codigo : null,
            metodo_pagamento : null,
            produtos : [],
            valor_total : null,
            aprovado : null,
        }
    },
    getters: {
        ListaPedidos(state){
            return state.showListaPedidos
        },
        getCodigo(state){
            return state.cod
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
        getPedidoAtual(state){
            return state.pedidoAtual
        }
    },
    mutations: {
        setPedidoAtual(state, payload){
            state.pedidoAtual.codigo = payload.ID
            state.pedidoAtual.metodo_pagamento = payload.METODO_PAGAMENTO
            state.pedidoAtual.valor_total = payload.VALOR_TOTAL
            state.pedidoAtual.produtos = payload.PRODUTOS
            state.pedidoAtual.aprovado = payload.APROVADO == 'T' ? "PAGO" : "PENDENTE"  
        },
        activeListaRapidaProdutos(state){
            state.showListaRapidaProdutos = true
        },
        desativeListaRapidaProdutos(state){
            state.showListaRapidaProdutos = false
        },
        saveValorTotal(state,payload){
            state.valor_Total_Pedidos = parseFloat(payload)
        },
        saveCod(state ,payload){
            state.cod = payload
        },
        savePedidos(state, payload){
            const exist = state.pedidos.find(o => o.id == payload.id)
            if(exist){
              exist.quantidade += parseInt(payload.quantidade)
            }else{
              state.pedidos.push(payload)
            }
        },
        setListaPedidos(state, payload){
            state.pedidos = payload
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
       async editarPedido(context , payload){
            let edit = false
            context.commit("limpaPedido")
            await pedidoService.edit(payload.ID, payload).then((res)=>{
                console.log(res.data)
                context.commit("setPedidoAtual", res.data)
                context.commit("setListaPedidos", res.data.PRODUTOS)
                context.commit("saveValorTotal", res.data.VALOR_TOTAL)
                edit = true
            })
            return edit
        },
        findProduto(context ,payload){
           let getProduto =  productService.findProdutoById(payload.id).then((res)=>{
                if(res.status == 200){
                    this.fail = false
                    let payload2 = {id : res.data.ID_PRODUTO, nome : res.data.NOME, valor : res.data.VALOR, quantidade : payload.quantidade}
                    context.commit('somaItens', res.data.VALOR)
                    context.commit('saveCod', res.data.ID)
                    context.commit("savePedidos", payload2) 
                    console.log(payload)
                    return true
                }else{
                    return false
                }
            }) 
            return getProduto
        },
        async geraVenda(context, payload){
          let gera = await pedidoService.save(payload).then((res)=>{
                if(res.status == 201){
                    console.log(res.data)
                    context.commit("setPedidoAtual", res.data)
                    context.commit("limparValorTotal")
                    return true
                }else if(res.status != 200){
                   return false
                }
            })
            return gera
        },
        async  findPedido(context, payload){
            let pedido = null
            context.commit("limpaPedido")
            context.commit("limparValorTotal")
           await pedidoService.findById(payload).then((res)=>{
                context.commit("setListaPedidos", res.data.PRODUTOS)
                context.commit("saveValorTotal", res.data.VALOR_TOTAL)
                pedido = res.data
            })
            return pedido
        }
    },
}