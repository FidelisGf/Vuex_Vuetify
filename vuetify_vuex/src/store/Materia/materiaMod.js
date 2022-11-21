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
            const exist = state.materiais.find(o => o.ID == payload.ID)
            if(exist){
             exist.QUANTIDADE += parseInt(payload.QUANTIDADE)
            }else{
              state.materiais.push(payload)
            }
         
        },
        clearMateriais(state){
            state.materiais = []
            state.custo_total = 0
        },
        somaCustoTotal(state, payload){
            state.custo_total += parseFloat(payload)
        },
        removeMateria(state, payload){
            state.custo_total = parseFloat(state.custo_total - (payload.QUANTIDADE * payload.CUSTO))
            state.materiais = state.materiais.filter(o => o.ID !== payload.ID)
        },
        async removeQntdMateria(state, payload){
            if(payload.check == true){
                const exist = state.materiais.find(o => o.ID == payload.ID)
                if(exist){
                exist.QUANTIDADE =parseInt( payload.QUANTIDADE )
                }
            }
        },
        saveCustoTotal(state, payload){
            state.custo_total = payload
        }
    },
    actions: {
        clearMateriais(context){
            context.commit("clearMateriais")
        },
        saveCustoTotal(context, payload){
            context.commit("saveCustoTotal", payload)
        },
        removeMateria(context, payload){
            context.commit('removeMateria', payload)
        },
        async removeQntdMateria(context, payload){
            payload.check = false
            let check = await context.dispatch("checkQuantidade", payload)
           
            let msg = {text : '', type : ''}
            if(check){
                msg.type = "success"
                msg.text = "Quantidade Alterada com sucesso !"
                payload.check = true
                context.commit('removeQntdMateria', payload)
                return msg
            }else{
               
                msg.type = "danger"
                msg.text = "Quantidade Insuficiente !"
                context.commit("removeQntdMateria", payload)
                return msg
            }
           
        },
       setMateriais(context, payload){
            context.commit("setMateriais", payload)
       },
       async post(context , payload){
            let text = ""
            try {
                await materiaService.post(payload).then((res)=>{
                    payload.ID = res.data.ID
                    text = "Sucesso : Materia Prima cadastrada !"
                })
                return text
            } catch (error) {
                text = "Erro :" + error.response.data.message
                return text
            }
       },
       async adicionaMaterial(context, payload){
            let text = ""
            try {
                await materiaService.aumentaQuantidade(payload).then((res)=>{
                    text = res.data.message
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
                    let obj = {ID : res.data.ID,  NOME : res.data.NOME, CUSTO : parseFloat(res.data.CUSTO), QUANTIDADE : payload.QUANTIDADE}
                    console.log(obj)
                    if(res.data.QUANTIDADE >= parseInt(payload.QUANTIDADE * payload.QNTD_PROD)){
                        context.commit("saveMaterialInList", obj)
                        context.commit("somaCustoTotal", parseFloat(res.data.CUSTO * payload.QUANTIDADE))
                        payload2.text = "Item adicionado com sucesso !"
                        payload2.type = "success"
                    }else{
                        payload2.text = "Quantidade Insuficiente !"
                        payload2.type = "danger"
                    }
                })
                return payload2
            } catch (error) {
                console.log(error)
                payload2.text = 'Falha ao adicionar Item !'
                payload2.type = 'danger'
                return payload2
            }
       },
       async checkQuantidade(context, payload){
            let flag = false
            try {
                
                await materiaService.findById(payload.ID).then((res)=>{
                    if(res.data.QUANTIDADE >= payload.QUANTIDADE){
                        flag = true
                        
                    }
                })
                return flag
               
            }catch(error){
                return flag
            }
       }
    },
}