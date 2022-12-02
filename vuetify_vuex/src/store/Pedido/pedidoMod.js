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
        getCodigo(state){
            return state.cod
        },
        getValorTotal(state){
            state.valor_Total_Pedidos = state.pedidos.reduce((accumulator, object)=>{
                return parseFloat(accumulator) + parseFloat(object.VALOR * object.QUANTIDADE)
            },0)
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
        saveCod(state ,payload){
            state.cod = payload
        },
        savePedidos(state, payload){
            const exist = state.pedidos.find(o => o.ID == payload.ID)
            if(exist){
              exist.QUANTIDADE += parseInt(payload.QUANTIDADE)
            }else{                                      
              state.pedidos.push(payload)
            }
        },
        setListaPedidos(state, payload){
            state.pedidos = payload
        },
        removePedido(state, payload){                   
            state.valor_Total_Pedidos -= parseFloat(payload.VALOR * payload.QUANTIDADE)
            if(state.valor_Total_Pedidos <= 0 || isNaN(state.valor_Total_Pedidos)){
                state.valor_Total_Pedidos = 0
            }
            state.pedidos = state.pedidos.filter(o => o.ID !== payload.ID)
        },
        limpaPedido(state){
            state.pedidos = []
        },
        removeQntdPedido(state, payload){
            const exist = state.pedidos.find(o => o.ID == payload.ID)
            if(exist){
              exist.QUANTIDADE = payload.QUANTIDADE
            }
        },
    },
    actions: {
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
                        context.commit("setPedidoAtual", payload.PRODUTOS)
                        context.commit("setListaPedidos", res.data.produtos)
                        edit = true
                    }
                    return edit
                }) 
        },
        async deletePedido(context, payload){
            let text = ""
                try {
                    await pedidoService.destroy(payload).then((res)=>{
                        text = res.data.message
                    })
                    return text
                } catch (error) {
                    text = "Error : " + error.response.data.message
                    return text
                }
        },
        async findProduto(context ,payload){
            let getProduto = false
            try {
                getProduto = await productService.findProdutoById(payload.ID).then(async (res)=>{
                    if(res.status == 200){
                        this.fail = false
                        let check = null
                        await pedidoService.checkQuantidadeProduto(payload).then((res2)=>{
                            console.log(res2.data)
                            check = res2.data
                        });
                        if(check == true){
                            let payload2 = {ID : res.data.ID, NOME : res.data.NOME, VALOR : res.data.VALOR, QUANTIDADE : payload.QUANTIDADE, MEDIDA : res.data.medida.NOME}
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
                    await pedidoService.findById(payload).then((res)=>{
                        if(res.status == 200){
                            context.commit("setListaPedidos", res.data.produtos)
                            context.commit("setPedidoAtual", res.data.pedido)
                            console.log(res.data.pedido.VALOR_TOTAL)
                            if(res.data.pedido.ID_CLIENTE != null){
                                context.dispatch("clienteMod/getCliente", res.data.pedido.ID_CLIENTE, { root: true })
                            }
                            pedido = res.data.pedido
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