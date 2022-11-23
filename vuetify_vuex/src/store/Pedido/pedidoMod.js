import estoqueService from "@/service/estoqueService"
import pedidoService from "@/service/pedidoService"
import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
        counterProdInList : 0,
        pedidos: [],
        valor_Total_Pedidos : 0,
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
        getCounterProd(state){
            return state.counterProdInList
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
        getPedidoAtual(state){
            return state.pedidoAtual
        }
    },
    mutations: {
        resetCountProd(state){
            state.counterProdInList = 0
        },
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
              state.counterProdInList += 1                                           
              state.pedidos.push(payload)
            }
        },
        setListaPedidos(state, payload){
            state.pedidos = payload
        },
        removePedido(state, payload){                   
            state.valor_Total_Pedidos -= parseFloat(payload.valor)
            state.pedidos = state.pedidos.filter(o => o.id !== payload.id)
            state.counterProdInList -= 1 
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
        async removeQntdPedido(context, payload){ //pode adicionar alem de remover
            try {
                let check = null
                await pedidoService.checkQuantidadeProduto(payload).then((res2)=>{
                    check = res2.data
                    if(check == true){
                        context.commit('removeQntdPedido', payload)
                    }
                });
                return check
            } catch (error) {
                console.log(error)
            }
            
        },
       async editarPedido(context , payload){
            let edit = false
            context.commit("limpaPedido")
             await pedidoService.edit(payload.ID, payload).then((res)=>{
                    if(res.status ===  200){
                        context.commit("setPedidoAtual", res.data)
                        context.commit("setListaPedidos", res.data.PRODUTOS)
                        context.commit("saveValorTotal", res.data.VALOR_TOTAL)
                        edit = true
                    }
                    return edit
                }) 
        },
        async deletePedido(context, payload){
            let gera = false
                try {
                    await pedidoService.destroy(payload).then(()=>{
                        gera = true
                    })
                    return gera
                } catch (error) {
                    return gera
                }
        },
        async findProduto(context ,payload){
            let getProduto = false
            try {
                getProduto = await productService.findProdutoById(payload.id).then(async (res)=>{
                    if(res.status == 200){
                        this.fail = false
                        let check = null
                        await pedidoService.checkQuantidadeProduto(payload).then((res2)=>{
                            console.log(res2.data)
                            check = res2.data
                        });
                        if(check == true){
                            let payload2 = {id : res.data.ID, nome : res.data.NOME, valor : res.data.VALOR, quantidade : payload.quantidade, medida : res.data.medida.NOME}
                            context.commit('somaItens', parseFloat(res.data.VALOR * payload.quantidade))
                            context.commit('saveCod', res.data.ID)
                            context.commit("savePedidos", payload2) 
                            return true
                        }else{
                            return false
                        } 
                    }
                }) 
                return getProduto
            } catch (error) {
                return getProduto
            }
        },
        async geraVenda(context, payload){
            console.log(payload)
            let gera = false
            try {
                gera = await pedidoService.save(payload).then((res)=>{
                    if(res.status == 201){
                        context.commit("setPedidoAtual", res.data)
                        context.commit("limparValorTotal")
                        context.commit("resetCountProd")
                        return true
                    }
                })
                return gera
            } catch (error) {
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
                            context.commit("setPedidoAtual", res.data)
                            context.commit("saveValorTotal", parseFloat(res.data.VALOR_TOTAL))
                            if(res.data.ID_CLIENTE != null){
                                context.dispatch("clienteMod/getCliente", res.data.ID_CLIENTE, { root: true })
                            }
                            pedido = res.data
                    }
                })
                return pedido
            } catch (error) {
                console.log(error)
            }
        },
        async getQuantidadeDisponivelProduto(context, payload){
            let Quantidade = 0
            try {
                await estoqueService.getQuantidadeFromProduto(payload).then((res)=>{
                    console.log(res.data)
                    Quantidade = res.data
                })
                return Quantidade
            } catch (error) {
                console.log(error)
            }
        }
    },
}