import axios from "axios";

export default{
    async auth(to, from, next){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
        try{
            const res = await axios.get("/auth/validateTkn")
            if(res.status === 200){
                const res = await axios.get("/checaEmpUser")
                if(res.data == 1){
                    next();
                }else if(res.data != 1){
                    alert('Vincule uma empresa a sua conta !');
                    next();
                }
            }
            console.log(res.status)
        }catch(e){
            console.log()
            if(e.response.data == 'token_invalid' || e.response.data == 'user_not_found'){
                    alert('Voce precisa estar logado !')
                    next({name: 'login'})
            }else{
                axios.defaults.headers.common['Authorization'] = 'Bearer' + e.response.data.access_token
                localStorage.setItem('token', e.response.data.access_token)
                return this.auth();
            }  
        }
    }
}