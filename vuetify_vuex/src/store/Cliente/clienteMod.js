import clienteService from "@/service/clienteService"
export default{
    namespaced: true,
    state: {
        showModalCliente : false,
        client : {
            id : null,
            nome : null,
            cpf : null,
            endereco : null,
            telefone : null,

        },
        clienteVinculado : false,
    },
    getters: {
      getModalCliente(state){
        return state.showModalCliente
      },
      getCliente(state){
        return state.client
      },
      getVinculo(state){
        return state.clienteVinculado
      }
    },
    mutations: {
      activeModalCliente(state){
        state.showModalCliente = true
      },
      saveClient(state, payload){
        state.client.id = payload.ID 
        state.client.nome = payload.NOME
        state.client.cpf = payload.CPF 
        state.client.endereco = payload.ENDERECO
        state.client.telefone = payload.TELEFONE
      },
      disableModalCliente(state){
        state.showModalCliente = false
      },
      activeClienteVinculado(state){
        state.clienteVinculado = true
      },
      disableClienteVinculado(state){
        state.clienteVinculado = false
      },
      clearClient(state){
        state.client.id = null
        state.client.nome = null
      } 
    },
    actions: {
       desvincularCliente(context){
          context.commit("clearClient")
          context.commit("disableClienteVinculado")
          alert('Cliente desvinculado do pedido com sucesso ! ')
       },

       activeModalCliente(context){
            console.log('Ativou')
            context.commit("activeModalCliente")
       }, 
       disableModalCliente(context){
            context.commit('disableModalCliente')
       },
       saveCliente(context, payload){
        try {
          clienteService.save(payload).then((res) =>{
            console.log(res.data)
            alert('Cliente cadastrado com sucesso !')
          })
        } catch (error) {
          alert('Não foi possivel cadastrar o cliente')
        }
         
       },
       async getCliente(context, payload){
          try {
            await clienteService.getById(payload).then((res)=>{
              console.log(res.data)
              context.commit("saveClient", res.data)
              context.commit("activeClienteVinculado")
              alert('Cliente vinculado ao pedido com sucesso !')
            })
          } catch (error) {
            alert('Não foi possivel encontrar um cliente')
          }
          
       }
    },
}