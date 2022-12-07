<template>
  <v-app >
    <BarraLoading></BarraLoading>
    <router-view />
  </v-app>
</template>

<script>

// import SideBar from './components/SideBar.vue';
import { mapActions } from 'vuex';
import BarraLoading from './components/BarraLoading.vue';

export default {

    name: "App",
    data: () => ({
    }),
    methods:{
        ...mapActions(['setLoading'])
    },
    created(){
     
    },
    components: {  BarraLoading }
};
</script>
<style  lang="scss">
      /* width */
  ::-webkit-scrollbar {
    width: 8px;
    
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #262929;
    
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(68, 68, 68);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

