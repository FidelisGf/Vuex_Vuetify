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
