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
            console.log(payload);
        },
        setEmpresa(context, payload){
            context.commit('saveEmpresa', payload)
        },
        async getEmpresaFromUser(context){
            await userService.getEmpresaFromUser().then((res) =>{
                console.log(res.data)
                context.dispatch('setEmpresa', res.data)
            })   
        },
        profile(context){
            userService.profile().then((res)=>{
                console.log(res.data)
                context.commit('saveUser', res.data.NAME)
            })
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
                    console.log(res)
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