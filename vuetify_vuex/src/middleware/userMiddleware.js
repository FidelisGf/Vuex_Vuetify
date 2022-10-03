import axios from "axios";

export default{
    async checkIfUserHasEmpresa(to, from, next){
        try{
            const res = await axios.get("/checaEmpUser");
            console.log(res);
            if(res.data == 1){
                console.log('Ok');
                next();
            }else{
                next({name: 'login'})
            }
        }catch(e){
            // alert('Voce precisa estar logado !')
            // next({name: 'login'})
        }
    }
}