import axios from "axios"

export default{
    save(payload){
        return axios.post("/pedidos", payload)
    },
    get(opcao,page){
        return axios.get("/pedidos?page=" + page, {params:{ opcao: opcao}});
    },
    findById($id){
        return axios.get("/pedidos/" + $id)
    },
    edit($id, payload){
        return axios.put("/pedidos/" + $id, payload)
    }
}