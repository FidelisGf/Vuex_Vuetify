import axios from "axios";
axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const access_token = localStorage.getItem("token");
      if (error.response.status === 401 && access_token) {
        localStorage.setItem('token', error.response.data)
        return error;
      }
      return Promise.reject(error);
    }
)
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
            if(e.response.status == 401){
                    alert('Voce precisa estar logado !')
                    next({name: 'login'})
            }
        }
    }
}