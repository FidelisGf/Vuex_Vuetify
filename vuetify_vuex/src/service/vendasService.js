import axios from "axios"

export default{
    getVendasByDia(){
        return axios.get("/getVendasPorDia")
    },
    getTotalVendasUltimosTresMeses(){
        return axios.get("/getTotalVendasUltimosTresMeses")
    }
}