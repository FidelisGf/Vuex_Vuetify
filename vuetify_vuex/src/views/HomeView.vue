<template>
  <v-app>
      <SideBar/>
    <v-main >
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  /* eslint-disable */
  import HelloWorld from '../components/HelloWorld'
import SideBar from '@/components/SideBar.vue';

  export default {
    name: 'Home',

    components: {
    HelloWorld,
    SideBar
},
  }
</script>

<style scoped lang="scss">
  
</style>
