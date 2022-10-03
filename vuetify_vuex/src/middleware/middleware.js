import axios from "axios";

export default{
    /* eslint-disable */
    async auth(to, from, next){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

        try{
            const res = await axios.get("/auth/validateTkn")
            console.log(res.status);
            if(res.status === 200){
                next();
            
            }
           
        }catch(e){
            alert('Voce precisa estar logado !')
            next({name: 'login'})
        }
        
        
    }
}