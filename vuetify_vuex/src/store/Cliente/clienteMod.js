import clienteService from "@/service/clienteService"
export default{
    namespaced: true,
    state: {
        client : {
            id : null,
            nome : null,
            cpf : null,
            endereco : null,
            telefone : null,
            email : null,

        },
        clienteVinculado : false,
    },
    getters: {
      getCliente(state){
        return state.client
      },
      getVinculo(state){
        return state.clienteVinculado
      }
    },
    mutations: {
      SAVE_CLIENT(state, payload){
        state.client.id = parseInt(payload.ID) 
        state.client.nome = payload.NOME
        state.client.cpf = payload.CPF 
        state.client.endereco = payload.ENDERECO
        state.client.telefone = payload.TELEFONE
        state.client.email = payload.EMAIL
      },
      ACTIVE_CLIENTE_VINCULADO(state){
        state.clienteVinculado = true
      },
      DISABLE_CLIENTE_VINCULADO(state){
        state.clienteVinculado = false
      },
      CLEAR_CLIENT(state){
        state.client.id = null
        state.client.nome = null
        state.clienteVinculado = false
      } 
    },
    actions: {
        clearClient(context){
          context.commit("CLEAR_CLIENT")
        },
       desvincularCliente(context){
          context.commit("CLEAR_CLIENT")
          context.commit("DISABLE_CLIENTE_VINCULADO")
          let text = 'Sucesso : Cliente desvinculado do pedido !'
          return text
       },
       async saveCliente(context, payload){
          const text = clienteService.save(payload).then(()=>{
              return 'Cliente cadastrado com sucesso !'
          }).catch((error)=>{
              return "Error : " + error.response.data.message
          })
          return text
       },
       async getCliente(context, payload){
          const text = clienteService.getById(payload).then((res)=>{
              context.commit("SAVE_CLIENT", res.data)
              context.commit("ACTIVE_CLIENTE_VINCULADO")
              return 'Sucesso : Cliente vinculado ao pedido !'
          }).catch((error)=>{
              return "Error : " + error.response.data.message
          })
          return text
       }
    },
}