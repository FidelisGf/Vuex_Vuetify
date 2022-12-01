import axios from "axios"

export default{
    save(payload){
        return axios.post("/pedidos", payload)
    },
    get(opcao,page){
        return axios.get("/pedidos?page=" + page, {params:{ opcao: opcao}})
    },
    findById($id){
        return axios.get("/pedidos/" + $id)
    },
    destroy($id){
        return axios.delete("/pedidos/" + $id)
    },
    edit($id, payload){
        return axios.put("/pedidos/" + $id, payload)
    },
    checkQuantidadeProduto(payload){
        payload.QUANTIDADE = parseInt(payload.QUANTIDADE)
        payload.ID = parseInt(payload.ID)
        return axios.post("/checkQuantidadeProduto", payload)
    }
}