import axios from "axios"

export default{
    save(payload){
        return axios.post("/pedidos", payload)
    },
    get(opcao,page){
        return axios.get("/pedidos?page=" + page, {params:{ opcao: opcao}});
    }
}