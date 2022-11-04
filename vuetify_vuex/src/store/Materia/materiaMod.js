import materiaService from "@/service/materiaService"
export default{
    namespaced: true,
    state: {
        materiais : [],
        custo_total : 0
       
    },
    getters: {
       getMateriais(state){
            return state.materiais
       },
       getCustoTotal(state){
            return state.custo_total
       }
    },
    mutations: {
        setMateriais(state, payload){
            state.materiais = payload
        },
        saveMaterialInList(state, payload){
            console.log(state.materiais)
            const exist = state.materiais.find(o => o.ID == payload.ID)
            if(exist){
             exist.QUANTIDADE += parseInt(payload.QUANTIDADE)
            }else{
              state.materiais.push(payload)
            }
        },
        somaCustoTotal(state, payload){
            state.custo_total += parseFloat(payload)
        },
        removeMateria(state, payload){
            state.materiais = state.materiais.filter(o => o.ID !== payload.ID)
        },
        removeQntdMateria(state, payload){
            const exist = state.materiais.find(o => o.ID == payload.ID)
            if(exist){
            exist.QUANTIDADE = payload.QUANTIDADE
            }
        },
        saveCustoTotal(state, payload){
            state.custo_total = payload
        }
    },
    actions: {
        saveCustoTotal(context, payload){
            context.commit("saveCustoTotal", payload)
        },
        removeMateria(context, payload){
            context.commit('removeMateria', payload)
        },
        removeQntdMateria(context, payload){
            context.commit('removeQntdMateria', payload)
        },
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
                    let obj = {ID : res.data.ID,  NOME : res.data.NOME, CUSTO : parseFloat(res.data.CUSTO), QUANTIDADE : parseInt(payload.QUANTIDADE)}
                    context.commit("saveMaterialInList", obj)
                    context.commit("somaCustoTotal", parseFloat(res.data.CUSTO * payload.QUANTIDADE))
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