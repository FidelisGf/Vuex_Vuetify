import axios from "axios"

export default{
    async post(payload){
        return axios.post("/penalidades", payload)
    },
  
}