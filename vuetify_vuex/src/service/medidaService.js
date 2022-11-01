import axios from "axios"

export default{

    get(){
        return axios.get("/medidas")
    },
    post(payload){
        return axios.post("/medidas", payload)
    }
}