import axios from "axios";

export default{
    getQuantidadeFromProduto($id){
        return axios.get("/getQuantidadeProduct/" + $id)
    },
  
}