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
       post(context, payload){
            try {
                tagService.save(payload).then((res)=>{
                    console.log(res.data)
                    alert('Tipo de despesa cadastrada com sucesso !')
                    context.commit("disableModalCadastro")
                })
            } catch (error) {
                alert('Falha ao cadastrar tipo de despesa')
                context.commit("disableModalCadastro")
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