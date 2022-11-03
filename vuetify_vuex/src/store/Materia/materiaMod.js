import materiaService from "@/service/materiaService"
export default{
    namespaced: true,
    state: {
        materiais : [],
       
    },
    getters: {
       getMateriais(state){
            return state.materiais
       }
    },
    mutations: {
      setMateriais(state, payload){
            state.materiais = payload
      },
      saveMaterialInList(state, payload){
            state.materiais.push(payload)
      }
    },
    actions: {
       setMateriais(context, payload){
            context.commit("setMateriais", payload)
       },
       async post(context , payload){
            let text = ""
            try {
                await materiaService.post(payload).then((res)=>{
                    payload.ID = res.data.ID
                    context.commit("saveMaterialInList", payload)
                    text = "Sucesso : Materia Prima cadastrada !"
                })
                return text
            } catch (error) {
                text = "Erro :" + error.response.data.message
                return text
            }
       },
       async findMateria(context, payload){
            let payload2 = {text : '', type : ''} 
            try {
                await materiaService.findById(payload.ID).then((res)=>{
                    let obj = {ID : res.data.ID,  NOME : res.data.NOME, CUSTO : res.data.CUSTO, QUANTIDADE : payload.QUANTIDADE }
                    context.commit("saveMaterialInList", obj)
                    payload2.text = "Item adicionado com sucesso !"
                    payload2.type = "success"
                })
                return payload2
            } catch (error) {
                payload2.text = 'Falha ao adicionar Item !'
                payload2.type = 'danger'
                return payload2
            }
       }
    },
}