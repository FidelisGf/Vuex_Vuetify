import axios from "axios"

export default{
    getEmpresaFromUser(){
        return axios.get("/getEmpresaFromUser")
    },
    login(payload){
        return axios.post("/auth/login", payload)
    },
    logout(){
        return axios.get("/auth/logout")
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
    },
    showAvailableRoles(){
        return axios.get("/auth/showAvalibleRoles");
    },
    getActiveUsers(){
        return axios.get("/getActiveUsers");
    },
    async show($id){
        return axios.get("/usuarios/" + $id)
    },
    getPenalidades($id){
        return axios.get("/getPenalidades/" + $id)
    },
    getVendasByUser($id){
        return axios.get("/getVendasByUser/" + $id)
    },
    getUserMediaVendasByAno($id){
        return axios.get("/getUserMediaVendasByAno/" + $id)
    },
    editUser(payload, $id){
        return axios.put("/usuarios/" + $id, payload)
    },
    getUserTotalVendasByMes($id){
        return axios.get("/getUserTotalVendasByMes/" + $id)
    },
    getHistoricoSalario($id){
        return axios.get("/getHistoricoSalarioUser/" + $id)
    }
}