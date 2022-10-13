import axios from "axios";

export default{
    getQuantidadeFromProduto($id){
        return axios.get("/getQuantidadeProduct/" + $id)
    },
    adicionarQuantidade(payload){
        return axios.post("/addEstoque", payload)
    },
    filter(page, opcao){
        return axios.get("/filterEstoque?page=" + page, { params: { opcao: opcao} });
    }
  
}