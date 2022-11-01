import despesaService from "@/service/despesaService"
export default{
    namespaced: true,
    state: {
       showCadastro : false,
       edit : false,
       despesasMes : 0
    },
    getters: {
       getModalCadastro(state){
            return state.showCadastro
       },
       getEditDespesa(state){
          return state.edit
       },
       getDespesasMes(state){
          return state.despesasMes
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
       },
       setDespesasMes(state, payload){
          state.despesasMes = payload
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
                    context.dispatch("despesasMes")
                    alert('Despesa Registrada com sucesso !')
                    return res.data.ID

               })
               return Id
           } catch (error) {
               alert('Falha ao registrar despesa')
           }
       },
       async allByTag(context, payload){
          try {
               let resposta = {current_page : null, totalPage : null}
               console.log(payload)
               await despesaService.despesasByTag(payload.ID_TAG, payload.current_page).then((res)=>{
                    console.log(res.data)
                    context.commit("produtoMod/beginListProduct",res.data.data, { root: true })
                    resposta.current_page = res.data.current_page;
                    resposta.totalPage = res.data.last_page;
               })
               return resposta
          } catch (error) {
               alert('Não foi possivel realizar o filtro')
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
       },
       async despesasMes(context){
          try {
              await despesaService.despesasMes().then((res)=>{
                    context.commit("setDespesasMes", res.data ) 
               })
               
          } catch (error) {
               console.log(error)
          }
          
       }
    },
}