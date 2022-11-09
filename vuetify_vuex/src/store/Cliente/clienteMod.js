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
      saveClient(state, payload){
        state.client.id = payload.ID 
        state.client.nome = payload.NOME
        state.client.cpf = payload.CPF 
        state.client.endereco = payload.ENDERECO
        state.client.telefone = payload.TELEFONE
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
        state.clienteVinculado = false
      } 
    },
    actions: {
        clearClient(context){
          context.commit("clearClient")
        },
       desvincularCliente(context){
          context.commit("clearClient")
          context.commit("disableClienteVinculado")
          let text = 'Sucesso : Cliente desvinculado do pedido !'
          return text
       },
       saveCliente(context, payload){
        try {
          clienteService.save(payload).then(() =>{
            alert('Cliente cadastrado com sucesso !')
          })
        } catch (error) {
          alert('Não foi possivel cadastrar o cliente')
        }
         
       },
       async getCliente(context, payload){
        let text = null
          try {
            await clienteService.getById(payload).then((res)=>{
              context.commit("saveClient", res.data)
              context.commit("activeClienteVinculado")
              text = 'Sucesso : Cliente vinculado ao pedido !'
            })
            return text
          } catch (error) {
            text = "Erro : " + error.response.data.message
            return text
          }
          
       }
    },
}