import axios from "axios";
export default{
    async auth(to, from, next){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
        try{
            const res = await axios.get("/auth/validateTkn")
            if(res.status === 200){
                next()
            }
        }catch(e){
            if(e.response.status == 401){
                next({name: 'login'})
            }
        }
    }
}