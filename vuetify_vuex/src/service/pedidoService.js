import axios from "axios"

export default{
    save(payload){
        return axios.post("/pedidos", payload)
    }
}