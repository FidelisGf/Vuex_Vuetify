import axios from "axios";

export default{
    async auth(to, from, next){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');
        try{
            const res = await axios.get("/auth/validateTkn")
            if(res.status === 200){
                const res = await axios.get("/checaEmpUser");
                console.log(res);
                if(res.data == 1){
                    console.log('Ok');
                    next();
                }
            }    
        }catch(e){
            alert('Voce precisa estar logado !')
            next({name: 'login'})
        }
    }
}