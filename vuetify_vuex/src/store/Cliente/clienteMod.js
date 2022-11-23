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
      saveClient(state, payload){
        state.client.id = parseInt(payload.ID) 
        state.client.nome = payload.NOME
        state.client.cpf = payload.CPF 
        state.client.endereco = payload.ENDERECO
        state.client.telefone = payload.TELEFONE
        state.client.email = payload.EMAIL
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
       async sendEmail(context, payload){
          await clienteService.sendEmailPdf(payload).then((res)=>{
            console.log(res)
          })
       },
       async saveCliente(context, payload){
        let text = ''
        try {
          await clienteService.save(payload).then(() =>{
            text = 'Cliente cadastrado com sucesso !'
          })
          return text
        } catch (error) {
          text = "Error : " + error.response.data.message
          return text
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
            text = "Error : " + error.response.data.message
            return text
          }
          
       }
    },
}