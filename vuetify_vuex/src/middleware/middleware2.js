import axios from "axios";
axios.interceptors.response.use(
    (response) => {
        
      return response;
    },
    async function (error) {
      const access_token = localStorage.getItem("token");
      if (error.response.status === 401 && access_token) {
        localStorage.setItem('token', error.response.data)
        return 
      }else{
        return Promise.reject(error);
      }
    }
)
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