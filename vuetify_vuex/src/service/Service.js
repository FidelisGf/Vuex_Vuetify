import axios from "axios"

export default{
    get(payload){
       return  axios.get("http://127.0.0.1:8000/api/" + payload.route,  
        { params: { opcao: payload.opcao, start : payload.dtStart, end : payload.dtFinal, pdf : payload.pdf} })
    }
}