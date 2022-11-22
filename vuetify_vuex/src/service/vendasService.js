import axios from "axios"

export default{
    getVendasByMes(){
        return axios.get("/getVendasPorDia")
    }
}