import axios from "axios"

export default{
    save(payload){
        return axios.post("/clientes", payload)
    },
    getById($id){
        return axios.get("/clientes/" + $id)
    },
    sendEmailPdf(payload){
        console.log(payload)
        return axios.post("/test/" + payload.ID, { params: { COD: payload.cod }})
    }
}