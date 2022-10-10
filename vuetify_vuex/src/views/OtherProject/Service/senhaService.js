import axios from "axios"

export default{
    getSenhas(){
        return axios.get("http://localhost:8085/passwords")
    },
    postSenha(payload){
        return axios.post("http://localhost:8085/passwords", payload)
    },
    editSenha($id, payload){
        return axios.put("http://localhost:8085/passwords/" + $id, payload)
    },
    findSenhaByDesc(payload){
        return axios.get("http://localhost:8085/passwords/findDescription/" + payload)
    }
}