import axios from "axios"

export default{
    getEmpresaFromUser(){
        return axios.get("/getEmpresaFromUser")
    },
    login(payload){
        return axios.post("/auth/login", payload)
    },
    profile(){
        return axios.get("/profile")
    },
    vinculaEmpresa(payload){
        return axios.post("/vincularUserEmpresa", payload)
    },
    register(payload){
        return axios.post("/auth/register", payload)
    },
    checkEmpresa(payload){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + payload
        return axios.get("/checaEmpUser")
    },
    enviarEmailRecuperacao(payload){
        return axios.post("/auth/sendMailResetPassword", payload)
    },
    mudarSenhaUser(payload){
        return axios.post("/auth/resetPassword", payload)
    }
}