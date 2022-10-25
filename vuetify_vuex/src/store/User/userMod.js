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
        }
    },
}