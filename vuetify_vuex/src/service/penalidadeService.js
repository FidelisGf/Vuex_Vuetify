import axios from "axios"

export default{
    async post(payload){
        return axios.post("/penalidades", payload)
    },
    getValorDescontoMes($id){
        return axios.get("/getDescontoMensalByUser/" + $id)
    }
  
}