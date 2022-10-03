<template>
  <v-app >
    <router-view />
  </v-app>
</template>

<script>
// import SideBar from './components/SideBar.vue';
import HomeView from './views/HomeView.vue';



/* eslint-disable */



export default {
    name: "App",
    data: () => ({
    }),
    components: { HomeView }
};
</script>
