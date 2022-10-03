<template>
  <v-app>
      <SideBarMega/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  /* eslint-disable */
  import HelloWorld from '../components/HelloWorld'
import SideBarMega from '@/components/SideBarMega.vue';

  export default {
    name: 'Home',

    components: {
    HelloWorld,
    SideBarMega
},
  }
</script>

<style scoped lang="scss">
  
</style>
