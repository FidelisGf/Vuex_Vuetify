import axios from "axios";

export default{
    getProdutos(){
        return axios.get("/products");
    },
    postProduto(payload){
        return axios.post("/products", payload);
    }
}