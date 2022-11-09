<template>
  <v-app >
    <BarraLoading></BarraLoading>
    <router-view />
  </v-app>
</template>

<script>

// import SideBar from './components/SideBar.vue';
import axios from 'axios';
import BarraLoading from './components/BarraLoading.vue';

export default {

    name: "App",
    data: () => ({
    }),
    created(){
        axios.interceptors.request.use ((config)=>{
            this.$store.commit('setLoading', true)
           
            return config;
        }, (erorr)=>{
            this.$store.commit('setLoading', false)
            
            return Promise.reject(erorr)
        })
        axios.interceptors.response.use((response)=>{
          this.$store.commit('setLoading', false)
          return response
        })
    },
    components: {  BarraLoading }
};
</script>
