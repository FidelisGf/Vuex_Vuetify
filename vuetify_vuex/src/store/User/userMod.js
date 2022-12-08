import userService from "@/service/userService"
import CryptoJS from 'crypto-js';
export default{
    namespaced: true,
    
    state: {
        empresa: null,
        user : null,
        userLevel : 2,
        userCargo : null,
    },
    
    getters: {
       getUserLevel(state){
            var level  = CryptoJS.AES.decrypt(state.userLevel.toString(), 'chave').toString(CryptoJS.enc.Utf8);
            return parseInt(level)
       }, 
       getUserCargo(state){
         return state.userCargo
       },
       getUser(state){
            return state.user
       },
       getEmpresa(state){
            return state.empresa
       }
    },
    mutations: {
        SAVE_USER(state, payload){
            state.user = payload
        },
        SET_USER_LEVEL(state, payload){
            var level  = CryptoJS.AES.encrypt(payload.level.toString(), 'chave').toString();
            state.userCargo = payload.cargo
            state.userLevel = level
        },
        SAVE_EMPRESA(state, payload){
            state.empresa = payload
        },
    },
    actions: {
        setUser(context, payload){
            context.commit('SAVE_USER', payload)
        },
        async showUser(context, payload){
            const res = userService.show(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                console.log(error) 
            })
            return res
        },
        setEmpresa(context, payload){
            context.commit('SAVE_EMPRESA', payload)
        },
        async getEmpresaFromUser(context){
            userService.getEmpresaFromUser().then((res) =>{
                context.dispatch('setEmpresa', res.data)
            }).catch((error)=>{
                console.log(error)
            })            
        },
        profile(context){
            userService.profile().then((res)=>{
                context.commit('SAVE_USER', res.data.NAME)
            })
        },
        async vinculaEmpresa(context, payload){
            const res = userService.vinculaEmpresa(payload).then((res)=>{
                return res.data.message
            }).catch((error)=>{
                return "Error : " + error.response.data.message 
            })
            return res
        },
        async register(context, payload){
            const text = userService.register(payload).then((res)=>{
                return res.data.message
            }).catch((error)=>{
                return "Error : " + error.response.data.message
            })
            return text
        },
        async edit (context, payload) {
            const text = userService.editUser(payload, payload.ID).then((res)=>{
                context.commit("produtoMod/EDIT_IN_LIST_PRODUCTS", payload, { root: true })
                return res.data.message 
            }).catch((error)=>{
                return "Error : " + error.response.data.message
            })
            return text
        },
        async login(context, payload){
            let check = {login : false, vinculado : false}
            const respo = userService.login(payload).then(async (res)=>{
                localStorage.setItem('token', res.data.access_token)
                check.login = true
                check.vinculado = await context.dispatch("checkEmpresa", res.data.access_token)
                userService.profile().then(async (res) =>{
                    context.commit("SET_USER_LEVEL", res.data)
                }).catch((error)=>{
                    console.log(error)
                })
                return check
            }).catch((error)=>{
                return error
            })
            return respo
        },
        async sendEmail(context, payload){
            const respo = userService.enviarEmailRecuperacao(payload).then(()=>{
                return true
            }).catch(()=>{
                return false
            })
            return respo
        },
        async avaibleRoles(){
            const roles = userService.showAvailableRoles().then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return roles
        },
        async changeSenha(context, payload){
            const respo = userService.mudarSenhaUser(payload).then(()=>{
                return true
            }).catch(()=>{
                return false
            })
            return respo
        },
        async checkEmpresa(context, payload){
            const check = userService.checkEmpresa(payload).then((res)=>{
                if(res.data != 0){
                    return true
                }else{
                    return false
                }
            }).catch(()=>{
                return false
            })
            return check
        },
        async logoutUser(){
            userService.logout().then((res)=>{
                console.log(res)
                localStorage.clear();
            }).catch((error)=>{
                console.log(error)
            })
        },
        async getActiveUsers(){
            const count = userService.getActiveUsers().then((res)=>{
                return res.data
            }).catch((error)=>{
                console.log(error)
            })
            return count
        },
        async getPenalidade(context, payload){
            const data = userService.getPenalidades(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return data
        },
        getVendasUser(context, payload){
            const data = userService.getVendasByUser(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return data
        },
        getUserMediaVendasAno(context, payload){
            console.log(payload)
            const data = userService.getUserMediaVendasByAno(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return data
        }

    },
}