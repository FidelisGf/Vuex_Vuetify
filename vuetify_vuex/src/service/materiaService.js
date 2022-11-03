import axios from "axios"

export default{

    get(page){
        return axios.get("/materiais?page=" + page)
    },
    post(payload){
        return axios.post("/materiais", payload)
    },
    findById($id){
        return axios.get("/materiais/" + $id)
    }  
}