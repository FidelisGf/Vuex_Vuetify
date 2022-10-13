import axios from "axios";
/* eslint-disable */
export default{
    get(page){
        return axios.get("/products?page=" + page)
    },
    postProduto(payload){
        return axios.post("/products", payload)
    },
    findAllProductByCategory($id, page){
        return axios.get("/allByCategory/" + $id  + "?page=" + page)
    },
    findProdutoById($id){
        return axios.get("/products/" + $id)
    },
    editProduct(payload, $id){
        return axios.put("/products/" + $id, payload)
    },
    deleteProduct($id){
        return axios.delete("/products/"+$id)
    },
    filters(opcao, page){
        return axios.get("/filterBy?page=" + page, { params: { opcao: opcao} });
    }
}