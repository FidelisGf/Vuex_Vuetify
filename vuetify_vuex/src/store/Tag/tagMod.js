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
       SET_TAGS(state, payload){
          state.tags = payload
       },
       ADD_TAG(state, payload){
          state.tags.push(payload)
       }
    },
    actions: {
       setTags(context, payload){
            context.commit('SET_TAGS', payload)
       },
       async post(context, payload){
            const text = tagService.save(payload).then((res)=>{
               context.commit("ADD_TAG", res.data)
               return "Sucesso : Tipo de Despesa cadastrada com sucesso !"
            }).catch((error)=>{
               return "Error : " + error.response.data.message
            })
            return text
       },
      
       async findAll(context){
          const tags = tagService.get().then((res)=>{
               context.commit('SET_TAGS', res.data)
               return res.data
          }).catch(()=>{
               alert('Nao foi possivel carregar as Tags')
          })   
          return tags   
       }
    },
}