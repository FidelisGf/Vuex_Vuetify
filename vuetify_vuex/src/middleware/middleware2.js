import axios from "axios";
export default{
    async auth(to, from, next){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
        axios.get("/auth/validateTkn").then(()=>{
            next()
        }).catch((e)=>{
            const access_token = localStorage.getItem("token");
            if(e.response.status == 401 && access_token){
                localStorage.setItem('token', e.response.data)
                axios.defaults.headers.common['Authorization'] = 'Bearer' + e.response.data
                next()
            }else{
                next({name: 'login'})
            }
        })
    }
}