import tagService from "@/service/tagService"
export default{
    namespaced: true,
    state: {
       tags : []
    },
    getters: {
       getTags(state){
            return state.tags
       }
    },
    mutations: {
       setTags(state, payload){
          state.tags = payload
       },
       addTag(state, payload){
          state.tags.push(payload)
       }
    },
    actions: {
       setTags(context, payload){
            context.commit('setTags', payload)
       },
       async post(context, payload){
            let text = null
            try {
               await tagService.save(payload).then((res)=>{
                    context.commit("addTag", res.data)
                    context.commit("disableModalCadastro")
                    text = "Sucesso : Tipo de Despesa cadastrada com sucesso !"
                })
                return text
            } catch (error) {
               context.commit("disableModalCadastro")
               return  text = "Erro: " + error.response.data.message
            }
       },
      
       async findAll(context){
          try {
             let tags = null   
             await tagService.get().then((res)=>{
                    tags = res.data
                    context.commit('setTags', res.data)
             })
             return tags
          } catch (error) {
               alert('Nao foi possivel carregar as Tags')
          }         
       }
    },
}