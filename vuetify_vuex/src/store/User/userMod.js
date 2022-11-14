import userService from "@/service/userService"
export default{
    namespaced: true,
    state: {
        empresa: null,
        user : null
    },
    getters: {
       getUser(state){
            return state.user
       },
       getEmpresa(state){
            return state.empresa
       }
    },
    mutations: {
        saveUser(state, payload){
            state.user = payload
        },

        saveEmpresa(state, payload){
            state.empresa = payload
        },
    },
    actions: {
        setUser(context, payload){
            context.commit('saveUser', payload)
        },
        setEmpresa(context, payload){
            context.commit('saveEmpresa', payload)
        },
        async getEmpresaFromUser(context){
            await userService.getEmpresaFromUser().then((res) =>{
                context.dispatch('setEmpresa', res.data)
            })   
        },
        profile(context){
            userService.profile().then((res)=>{
                context.commit('saveUser', res.data.NAME)
            })
        },
        async vinculaEmpresa(context, payload){
            let tmp = false
            try {
                await userService.vinculaEmpresa(payload).then((res)=>{
                    console.log(res.data)
                    tmp = true
                })
                return tmp
            } catch (error) {
                tmp = false
                return tmp
            }
        },
        async register(context, payload){
            try {
                await userService.register(payload).then(()=>{
                    alert('Usuario Criado com sucesso !')
                    
                })
            } catch (error) {
                alert("Dados Invalidos");
            }
        },
        async login(context, payload){
            let check = {login : false, vinculado : false}
            try {
                await userService.login(payload).then(async (res)=>{
                    localStorage.setItem('token', res.data.access_token)
                    check.login = true
                    check.vinculado = await context.dispatch("checkEmpresa", res.data.access_token)
                })
                return check
            } catch (error) {
                return check
            }
        },
        async checkEmpresa(context, payload){
            let check = false
            try {
                 await userService.checkEmpresa(payload).then((res)=>{
                    if(res.data != 0){
                        check = true
                    }else {
                        check =  false
                    }
                })
                return check
            } catch (error) {
                check = false
                return check
            }
           
        }
    },
}