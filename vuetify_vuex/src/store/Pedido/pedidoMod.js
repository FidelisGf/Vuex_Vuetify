import pedidoService from "@/service/pedidoService"
import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
        pedidos: [],
        valor_Total_Pedidos : null,
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
        getCodigo(state){
            return state.cod
        },
        getValorTotal(state){
            return state.valor_Total_Pedidos
        },
        getPedidos(state){
            return state.pedidos
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
    },
    actions: {
        somaItens(context){
            context.commit('somaItens')
        },
        limparValorTotal(context){
            context.commit('limparValorTotal')
        },
        limpaPedido(context){
            context.commit('limpaPedido')
        },
        setListaPedidos(context, payload){
            context.commit('saveListaPedidos', payload)
        },
        saveCod(context, payload){
            context.commit('saveCod', payload)
        },
        setPedidoAtual(context, payload){
            context.commit('setPedidoAtual', payload)
        },
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
                    if(res.status ===  200){
                        console.log(res.data)
                        context.commit("setPedidoAtual", res.data)
                        context.commit("setListaPedidos", res.data.PRODUTOS)
                        context.commit("saveValorTotal", res.data.VALOR_TOTAL)
                        edit = true
                    }
                    return edit
                }) 
        },
        async findProduto(context ,payload){
            let getProduto = false
            try {
                getProduto = await productService.findProdutoById(payload.id).then((res)=>{
                    if(res.status == 200){
                        this.fail = false
                        let payload2 = {id : res.data.ID, nome : res.data.NOME, valor : res.data.VALOR, quantidade : payload.quantidade}
                        context.commit('somaItens', parseFloat(res.data.VALOR * payload.quantidade))
                        context.commit('saveCod', res.data.ID)
                        context.commit("savePedidos", payload2) 
                        console.log(payload)
                        return true
                    }
                }) 
                return getProduto
            } catch (error) {
                alert('Falha ao encontrar o produto por esse codigo !')
                return getProduto
            }
          
        },
        async geraVenda(context, payload){
            let gera = false
            try {
                gera = await pedidoService.save(payload).then((res)=>{
                    if(res.status == 201){
                        console.log(res.data)
                        context.commit("setPedidoAtual", res.data)
                        context.commit("limparValorTotal")
                        return true
                    }
                })
                return gera
            } catch (error) {

                alert('Falha ao Gerar Venda')
                return gera
            }
        
        },
        async findPedido(context, payload){
            try {
                let pedido = null
                context.commit("limpaPedido")
                context.commit("limparValorTotal")
                    await pedidoService.findById(payload).then((res)=>{
                        if(res.status == 200){
                            context.commit("setListaPedidos", res.data.PRODUTOS)
                            context.commit("saveValorTotal", parseFloat(res.data.VALOR_TOTAL))
                            pedido = res.data
                    }
                })
                return pedido
            } catch (error) {
                alert('Pedido não encontrado')
            }

         
        }
    },
}