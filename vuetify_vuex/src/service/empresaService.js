import axios from "axios"

export default{
    checaEmpresa(){
        return axios.get("/checaEmpUser")
    },
    findByUser(){
        return axios.get("/empresaPorUsuario");
    }
}