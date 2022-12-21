<template>
  <v-app>
    <v-navigation-drawer 
      app
      dark
      class="black"
      
    >
      <SideBar />
    </v-navigation-drawer>

    <v-app-bar class="hidden-lg-and-up cards-colors"
      fixed
      v-if="$vuetify.breakpoint.mobile"
    
      
    
    >
    <v-app-bar-nav-icon @click.native="dialog = true" color="white"></v-app-bar-nav-icon>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="cards-colors">
          <v-toolbar flat class="cards-colors">
            <v-btn icon @click.native="dialog = false">
              <v-icon color="red accent-1">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list
            nav
            dense
            class="text-center pt-2 cards-colors"
          >
            <v-list-item @click="$router.push('/pedidos')" @click.native="dialog = false" link >
              <v-list-item-icon>
                <v-icon color="white">mdi-cash-register</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text" color="teal lighten-1">
                Registrar Venda
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/empresa')" v-if="userLevel > 2" 
            @click.native="dialog = false" link >
              <v-list-item-icon>
                <v-icon color="white">mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">Minha Empresa</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/estoque')" @click.native="dialog = false">
              <v-list-item-icon>
                <v-icon color="white">mdi-archive</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">Gestão do Estoque</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/relatorio') " v-if="userLevel > 2" 
              @click.native="dialog = false">
              <v-list-item-icon>
                <v-icon color="white">mdi-printer</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">Relatorios Diversos</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/despesas')" @click.native="dialog = false">
              <v-list-item-icon>
                <v-icon color="white">mdi-currency-usd-off</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">Despesas</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/funcionarios')" @click.native="dialog = false">
              <v-list-item-icon>
                <v-icon color="white">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">Funcionarios</v-list-item-title>
            </v-list-item>
            <v-list-item  @click="$router.push('/')" link>
              <v-list-item-icon>
                <v-icon color="white">mdi-arrow-left</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">Sair</v-list-item-title>
            </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-app-bar>
    <v-main class="info" > 
      <v-container fluid >
        <Dicas v-if="['home'].includes($route.name)" ></Dicas>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  /* eslint-disable */
  import HelloWorld from '../components/HelloWorld'
import SideBar from '@/components/SideBar.vue';
import Dicas from '@/components/DicasSistema.vue';
import { mapGetters } from 'vuex';
  export default {
    name: 'Home',

    components: {
    HelloWorld,
    SideBar,
    Dicas
},
    data(){
      return {
        dialog: false,
      }
    },
    computed:{
        ...mapGetters({userLevel : 'userMod/getUserLevel'})
    }
  

  }
</script>

<style scoped lang="scss">
    
</style>
