import axios from "axios"

export default{
    save(payload){
        return axios.post("/tags", payload)
    },
    get(){
        return axios.get("/tags")
    }
}