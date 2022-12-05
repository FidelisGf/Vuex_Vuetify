import despesaService from "@/service/despesaService"
export default{
    namespaced: true,
    state: {
       despesasMes : 0
    },
    getters: {
       getDespesasMes(state){
          return state.despesasMes
       }
    },
    mutations: {
       SET_DESPESAS_MES(state, payload){
          state.despesasMes = payload
       }
    },
    actions: {
      async save(context, payload){
          let resposta = {Id : null, text : null}
          const text = despesaService.save(payload).then(async (res)=>{
               await context.dispatch("despesasMes")
               resposta.Id =  res.data.ID
               resposta.text = "Sucesso : Despesa cadastrada com sucesso !"
               return resposta
           }).catch((error)=>{
               resposta.text = "Erro :" + error.response.data.message
               return resposta
           })
           return text
       },
       async allByTag(context, payload){
          let resposta = {current_page : null, totalPage : null}
          const tmp = despesaService.despesasByTag(payload.ID_TAG, payload.current_page).then((res)=>{
               context.dispatch("produtoMod/beginListProduct",res.data.data, { root: true })
               resposta.current_page = res.data.current_page;
               resposta.totalPage = res.data.last_page;
               return resposta
          }).catch((error)=>{
               console.log(error)
               alert('Não foi possivel realizar o filtro')
          })
          return tmp
       },
       async findById(context, payload){
          const data = despesaService.findById(payload).then((res)=>{
               return res.data
          }).catch((error)=>{
               console.log(error)
               alert('Não foi possivel encontrar !')
          })
          return data
       },
       async edit(context, payload){
          const text = despesaService.edit(payload, payload.ID).then(()=>{
               context.commit("produtoMod/EDIT_IN_LIST_PRODUCTS", payload, { root: true })
               return "Sucesso : Despesa editada !"
          }).catch((error)=>{
               return "Erro :" + error.response.data.message
          })
          return text
       },
       async despesasMes(context){
          
          despesaService.despesasMes().then((res)=>{
               context.commit("SET_DESPESAS_MES", res.data ) 
          }).catch((error)=>{
               console.log(error)
          })
       }
    },
}