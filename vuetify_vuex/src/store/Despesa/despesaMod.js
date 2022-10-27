import despesaService from "@/service/despesaService"
export default{
    namespaced: true,
    state: {
       showCadastro : false,
       edit : false,
    },
    getters: {
       getModalCadastro(state){
            return state.showCadastro
       },
       getEditDespesa(state){
          return state.edit
       }
    },
    mutations: {
       activeModalCadastro(state){
            state.showCadastro = true
       },
       disableModalCadastro(state){
            state.showCadastro = false
       },
       activeEditDespesa(state){
          state.edit = true
       },
       disableEditDespesa(state){
          state.edit = false
       }
    },
    actions: {
       activeEditDespesa(context){
          context.commit('activeEditDespesa')
       },   
       disableEditDespesa(context){
          context.commit('disableEditDespesa')
       },
       activeMod(context){
            context.commit("activeModalCadastro")
       },
       disableModalCadastro(context){
            context.commit("disableModalCadastro")
       },
      async save(context, payload){
           try {
               let Id = await despesaService.save(payload).then((res)=>{
                    
                    alert('Despesa Registrada com sucesso !')
                    return res.data.ID
               })
               return Id
           } catch (error) {
               alert('Falha ao registrar despesa')
           }
       },
       async findById(context, payload){
          try {
               let data = await despesaService.findById(payload).then((res)=>{
                    return res.data
               })
               return data
          } catch (error) {
               alert('Falha ao carregar despesa !')
          }
       },
       async edit(context, payload){
          try {
               await despesaService.edit(payload, payload.ID).then((res)=>{
                    console.log(res.data)
                    alert('Despesa editada com sucesso !')
                    context.commit("produtoMod/editListProduct", payload, { root: true })
               })
          } catch (error) {
               alert('Falha na edição dessa despesa')
          }
       }
    },
}