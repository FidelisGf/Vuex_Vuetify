import axios from "axios";
import CryptoJS from "crypto-js";
export default{
    async auth(to, from, next){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + CryptoJS.AES.decrypt(localStorage.getItem('token'), 
        'chave_token')
        .toString(CryptoJS.enc.Utf8);
        axios.get("/auth/validateTkn").then(()=>{
            next()
        }).catch((e)=>{
            const access_token = localStorage.getItem("token");
            if(e.response.status == 401 && access_token){
                localStorage.setItem('token', e.response.data)
                axios.defaults.headers.common['Authorization'] = 'Bearer' + CryptoJS.AES.decrypt(localStorage.getItem('token'), 
                'chave_token')
                .toString(CryptoJS.enc.Utf8);
                next()
            }else{
                next({name: 'login'})
            }
        })
    }
}