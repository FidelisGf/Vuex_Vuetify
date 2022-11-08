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
    checkEmpresa(payload){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + payload
        return axios.get("/checaEmpUser")
    }
}