import tagService from "@/service/tagService"
export default{
    namespaced: true,
    state: {
       showCadastro : false,
       tags : []
    },
    getters: {
       getModalCadastro(state){
            return state.showCadastro
       },
       getTags(state){
            return state.tags
       }
    },
    mutations: {
       activeModalCadastro(state){
            state.showCadastro = true
       },
       disableModalCadastro(state){
            state.showCadastro = false
       },
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
       activeModalCadastro(context){
            context.commit("activeModalCadastro")
       },
       disableModalCadastro(context){
            context.commit("disableModalCadastro")
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
                    console.log(res)
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