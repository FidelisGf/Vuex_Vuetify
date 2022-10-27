import axios from "axios"

export default{
    save(payload){
        return axios.post("/despesas", payload)
    },
    findById($id){
        return axios.get("/despesas/" + $id)
    },
    edit(payload, $id){
        return axios.put("/despesas/" + $id, payload)
    }
}