<template>
  <v-app>
    <SideBarMega></SideBarMega>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import SideBar from './components/SideBar.vue';
import SideBarMega from './components/SideBarMega.vue';
/* eslint-disable */



export default {
    name: "App",
    data: () => ({
    }),
    computed: {
        mini() {
            switch (this.$vuetify.breakpoint.name) {
                case "xs": return true;
                case "sm": return false;
                case "md": return false;
                case "lg": return false;
                case "xl": return false;
            }
            return this.$vuetify.breakpoint.mdAndDown;
        }
    },
    components: {SideBarMega }
};
</script>
