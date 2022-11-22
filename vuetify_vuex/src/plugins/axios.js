import Vue from "vue";
import axios from "axios";
import $store from '../store/index';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');
Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
});
export default function execute(){
    axios.interceptors.request.use((config)=>{
        $store.commit('setLoading', true)
        return config;
      }, (erorr)=>{
        this.$store.commit('setLoading', false)
        return Promise.reject(erorr)
      })
      axios.interceptors.response.use((response)=>{
        $store.commit('setLoading', false)
        return response
      },async function (error) {
          $store.commit('setLoading', false)
          const access_token = localStorage.getItem("token");
          if (error.response.status === 401 && access_token) {
            localStorage.setItem('token', error.response.data)
            return 
          }else{
            return Promise.reject(error);
          }
      })
}
