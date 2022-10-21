import axios from "axios";

export default{
    async get(){
        return await axios.get("/categorys")
    },
    postCategory(payload){
        return axios.post("/categorys", payload);
    }
}