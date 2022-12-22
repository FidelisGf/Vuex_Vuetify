import axios from "axios"


export default{
    post(payload){
        return axios.post("/cores", payload)
    }
}