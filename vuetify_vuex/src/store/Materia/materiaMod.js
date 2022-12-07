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
            if(state.materiais != null || state.materiais != undefined){
                state.custo_total = state.materiais.reduce((accumulator, object)=>{
                    return parseFloat(accumulator) + (parseFloat(object.CUSTO) * parseFloat(object.QUANTIDADE))
                },0)
            }else{
                state.custo_total = 0
            }
            return state.custo_total
       }
    },
    mutations: {
        SET_MATERIAS(state, payload){
            state.materiais = payload
        },
        SAVE_MATERIAL_IN_LIST(state, payload){
            const exist = state.materiais.find(o => o.ID == payload.ID)
            if(exist){
             exist.QUANTIDADE += parseInt(payload.QUANTIDADE)
            }else{
              state.materiais.push(payload)
            }
        },
        CLEAR_MATERIAIS(state){
            state.materiais = []
            state.custo_total = 0
        },
        REMOVE_MATERIA(state, payload){
            state.materiais = state.materiais.filter(o => o.ID !== payload.ID)
        },
        async REMOVE_QUANTIDADE_MATERIA(state, payload){
            if(payload.check == true){
                const exist = state.materiais.find(o => o.ID == payload.ID)
                if(exist){
                exist.QUANTIDADE =parseInt( payload.QUANTIDADE )
                }
            }
        },
    },
    actions: {
        clearMateriais(context){
            context.commit("CLEAR_MATERIAIS")
        },
        removeMateria(context, payload){
            context.commit('REMOVE_MATERIA', payload)
        },
        async removeQntdMateria(context, payload){
            payload.check = false
            let check = await context.dispatch("checkQuantidade", payload)
           
            let msg = {text : '', type : ''}
            if(check){
                msg.type = "success"
                msg.text = "Quantidade Alterada com sucesso !"
                payload.check = true
                context.commit('REMOVE_QUANTIDADE_MATERIA', payload)
                return msg
            }else{
                msg.type = "danger"
                msg.text = "Quantidade Insuficiente !"
                context.commit("REMOVE_QUANTIDADE_MATERIA", payload)
                return msg
            }

           
        },
       setMateriais(context, payload){
            context.commit("SET_MATERIAS", payload)
       },
       async post(context , payload){
            const text = materiaService.post(payload).then(()=>{
                return  "Sucesso : Materia Prima cadastrada !"
            }).catch((error)=>{
                return "Erro :" + error.response.data.message
            })  
            return text
       },
       async adicionaMaterial(context, payload){
            const text = materiaService.aumentaQuantidade(payload).then((res)=>{
                return res.data.message
            }).catch((error)=>{
                return "Erro :" + error.response.data.message
            })
            return text
       },
       async findMateria(context, payload){
            let payload2 = {text : '', type : ''} 
            const vl = materiaService.findById(payload.ID).then((res)=>{
                let obj = {ID : res.data.ID,  NOME : res.data.NOME, CUSTO : res.data.CUSTO, 
                QUANTIDADE : payload.QUANTIDADE}
                if(res.data.QUANTIDADE >= parseInt(payload.QUANTIDADE * payload.QNTD_PROD)){
                    context.commit("SAVE_MATERIAL_IN_LIST", obj)
                    payload2.text = "Item adicionado com sucesso !"
                    payload2.type = "success"
                }else{
                    payload2.text = "Quantidade Insuficiente !"
                    payload2.type = "danger"
                }
                return payload2
            }).catch(()=>{
                payload2.text = 'Falha ao adicionar Item !'
                payload2.type = 'danger'
                return payload2
            })
            return vl


       },
       async checkQuantidade(context, payload){
            const flag = materiaService.findById(payload.ID).then((res)=>{
                if(res.data.QUANTIDADE >= payload.QUANTIDADE){
                    return true
                }else{
                    return false
                }
            }).catch(()=>{
                return false
            })
            return flag
       },
       async getQuantidadeDisponivelMateria(context, payload){
            const Quantidade = materiaService.findById(payload).then((res)=>{
                return res.data.QUANTIDADE
            }).catch((error)=>{
                console.log(error)

            })
            return Quantidade
       }
    },
}