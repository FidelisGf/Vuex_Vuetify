import estoqueService from "@/service/estoqueService"
import pedidoService from "@/service/pedidoService"
import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
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
       
        getValorTotal(state){
            if(state.pedidos != null || state.pedidos != undefined){
                state.valor_Total_Pedidos = state.pedidos.reduce((accumulator, object)=>{
                    return parseFloat(accumulator) + parseFloat(object.VALOR * object.QUANTIDADE)
                },0)
            }else{
                state.valor_Total_Pedidos = 0
            }
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
       SET_PEDIDO_ATUAL(state, payload){
            state.pedidoAtual.codigo = payload.ID 
            state.pedidoAtual.metodo_pagamento = payload.METODO_PAGAMENTO
            state.pedidoAtual.valor_total = payload.VALOR_TOTAL
            state.pedidoAtual.produtos = payload.PRODUTOS
            state.pedidoAtual.aprovado = payload.APROVADO == 'T' ? "PAGO" : "PENDENTE"  
        },
        SAVE_PEDIDOS(state, payload){
            const exist = state.pedidos.find(o => o.ID == payload.ID)
            if(exist){
              exist.QUANTIDADE += parseInt(payload.QUANTIDADE)
            }else{                                      
              state.pedidos.push(payload)
            }
        },
        SAVE_LISTA_PEDIDO(state, payload){
            state.pedidos = payload
        },
        REMOVE_PEDIDO(state, payload){                   
            state.valor_Total_Pedidos -= parseFloat(payload.VALOR * payload.QUANTIDADE)
            if(state.valor_Total_Pedidos <= 0 || isNaN(state.valor_Total_Pedidos)){
                state.valor_Total_Pedidos = 0
            }
            state.pedidos = state.pedidos.filter(o => o.ID !== payload.ID)
        },
        LIMPA_PEDIDO(state){
            state.pedidos = []
        },
        REMOVE_QUANTIDADE_PEDIDO(state, payload){
            const exist = state.pedidos.find(o => o.ID == payload.ID)
            if(exist){
              exist.QUANTIDADE = payload.QUANTIDADE
            }
        },
    },
    actions: {
        limpaPedido(context){
            context.commit('LIMPA_PEDIDO')
        },
        setListaPedidos(context, payload){
            context.commit('SAVE_LISTA_PEDIDO', payload)
        },
        setPedidoAtual(context, payload){
            context.commit('SET_PEDIDO_ATUAL', payload)
        },
        savePedidos(context, payload){
            context.commit('SAVE_PEDIDOS', payload)
        },
        removePedido(context, payload){
            context.commit('REMOVE_PEDIDO', payload)
        },
        async removeQntdPedido(context, payload){ //pode adicionar alem de remover
            const check = pedidoService.checkQuantidadeProduto(payload).then((res2)=>{
                if(res2.data == true){
                    context.commit('REMOVE_QUANTIDADE_PEDIDO', payload)
                }
                return res2.data
            }).catch(()=>{
                return false
            })
            return check
        },
       async editarPedido(context , payload){
            context.dispatch("limpaPedido")
            const edit  = pedidoService.edit(payload.ID, payload).then((res)=>{
                if(res.status === 200){
                    context.dispatch("setPedidoAtual", payload)
                    return true
                }else{
                    return false
                }
            }).catch(()=>{
                return false
            })  
            return edit
        },
        async deletePedido(context, payload){
            const text = pedidoService.destroy(payload).then((res)=>{
                return res.data.message
            }).catch((error)=>{
                return "Error : " + error.response.data.message
            })
            return text
        },
        async findProduto(context ,payload){
            const getProduto = productService.findProdutoById(payload.ID).then(async (res)=>{
                if(res.status == 200){
                    this.fail = false
                }   
                const check = pedidoService.checkQuantidadeProduto(payload).then((res2)=>{
                    return res2.data
                });
                if(check){
                    let payload2 = {ID : res.data.ID, NOME : res.data.NOME, VALOR : res.data.VALOR, QUANTIDADE : payload.QUANTIDADE, MEDIDA : res.data.medida.NOME}
                    context.dispatch("savePedidos", payload2) 
                    return true
                }else{
                    return false
                }
            }).catch(()=>{
                return false
            })
            return getProduto
        },
        async geraVenda(context, payload){
            const gera = pedidoService.save(payload).then((res)=>{
                if(res.status == 201){
                    context.dispatch("setPedidoAtual", res.data)
                    return true
                }else{
                    return false
                }
            }).catch(()=>{
                return false
            })
            return gera
        },
        async findPedido(context, payload){
            context.dispatch("limpaPedido")
            const pedido = pedidoService.findById(payload).then((res)=>{
                context.dispatch("setListaPedidos", res.data.produtos)
                context.dispatch("setPedidoAtual", res.data.pedido)
                if(res.data.pedido.ID_CLIENTE != null){
                    context.dispatch("clienteMod/getCliente", res.data.pedido.ID_CLIENTE, { root: true })
                }
                return res.data.pedido
            }).catch((error)=>{
                console.log(error)
            })
            return pedido
        },
        async getQuantidadeDisponivelProduto(context, payload){
            const Quantidade = estoqueService.getQuantidadeFromProduto(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                console.log(error)
            })
            return Quantidade
        }
    },
}