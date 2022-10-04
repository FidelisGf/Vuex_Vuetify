import axios from "axios";

export default{
    getCategory(){
        return axios.get("/categorys")
    },
    postCategory(payload){
        return axios.post("/categorys", payload);
    }
}