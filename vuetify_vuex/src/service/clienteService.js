import axios from "axios"

export default{
    save(payload){
        return axios.post("/clientes", payload)
    },
    getById($id){
        return axios.get("/clientes/" + $id)
    }
}