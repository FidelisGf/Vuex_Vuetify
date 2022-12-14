import Vue from "vue";
import axios from "axios";
import $store from '../store/index';
import CryptoJS from "crypto-js";
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
if(localStorage.getItem('token') !== null){
  axios.defaults.headers.common['Authorization'] = 'Bearer' + CryptoJS.AES.decrypt(localStorage.getItem('token')
  .toString(), 'chave_token').toString(CryptoJS.enc.Utf8);
}

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
            let chaveToken = CryptoJS.AES.encrypt(error.response.data, 'chave_token').toString();
            localStorage.setItem('token', chaveToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer' + CryptoJS.AES.decrypt(
            localStorage.getItem('token').toString(), 
            'chave_token')
            .toString(CryptoJS.enc.Utf8);
          } 
          return Promise.reject(error); 
      })
}
