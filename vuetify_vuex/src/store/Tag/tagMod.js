import tagService from "@/service/tagService"
export default{
    namespaced: true,
    state: {
       showCadastro : false
    },
    getters: {
       getModalCadastro(state){
            return state.showCadastro
       }
    },
    mutations: {
       activeModalCadastro(state){
            state.showCadastro = true
       },
       disableModalCadastro(state){
            state.showCadastro = false
       }
    },
    actions: {
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
       async findAll(){
          try {
             let tags = null   
             await tagService.get().then((res)=>{
                    console.log(res)
                    tags = res.data
             })
             return tags
          } catch (error) {
               alert('Nao foi possivel carregar as Tags')
          }         
       }
    },
}