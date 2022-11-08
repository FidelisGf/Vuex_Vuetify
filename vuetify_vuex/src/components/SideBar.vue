<template>
    <div style="black"  v-if="!['login'].includes($route.name)">
        <v-navigation-drawer v-if="!$vuetify.breakpoint.smAndDown"
        :app="$vuetify.breakpoint.mdAndUp"
        :fixed="$vuetify.breakpoint.mdAndUp"
        absolute
        dark
        class="black"
        :scroll-toolbar-off-screen="$vuetify.breakpoint.smAndDown"
        permanent
        style="height: 110vh;"
        >  
        <v-list>
          <v-list-item class="px-5">
            <v-list-item-content>
              <v-list-item-subtitle >Admin</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h8">
                {{user}}
              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            nav
            
          >
          <v-list-item-group
          active-class="bg-active"
            >
              <v-list-item @click="$router.push('/pedidos')" link >
                <v-list-item-icon>
                  <v-icon>mdi-cash-register</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Registrar Venda</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/empresa')" link>
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Minha Empresa</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/estoque')">
              <v-list-item-icon>
                <v-icon>mdi-archive</v-icon>
              </v-list-item-icon >
              <v-list-item-title>Gestão do Estoque</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/relatorio')">
              <v-list-item-icon>
                <v-icon>mdi-printer</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Relatorios Diversos</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/despesas')" link>
              <v-list-item-icon>
                <v-icon>mdi-currency-usd-off</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Despesas</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/')" link>
              <v-list-item-icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
         
        </v-list>
    </v-navigation-drawer>
      <v-toolbar dense app dark  class="hidden-md-and-up">
        <v-app-bar-nav-icon @click.native="dialog = true"></v-app-bar-nav-icon>
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
                    <v-list-item-title class="white--text" color="teal lighten-1">Registrar Venda</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$router.push('/empresa')" @click.native="dialog = false" link >
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
                <v-list-item link @click="$router.push('/relatorio')" @click.native="dialog = false">
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
                <v-list-item  @click="$router.push('/')" link>
                  <v-list-item-icon>
                    <v-icon color="white">mdi-arrow-left</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="white--text">Sair</v-list-item-title>
                </v-list-item>
              </v-list>
          </v-card>
        </v-dialog>

      </v-toolbar>
      
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
/* eslint-disable */
export default {
  data(){
    return {
      dialog: false,
      one : false,
      user : null,
    }
  },
    computed:{
      ...mapGetters({name : 'userMod/getUser' }),
      mini(){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          case 'sm': return true
          case 'md': return false
          case 'lg': return false
          case 'xl': return false
        }
      return this.$vuetify.breakpoint.mdAndDown;
    }
  },
  methods:{
     
  },
  created(){
    
    this.user = localStorage.getItem('user')
  },

}
</script>

<style lang="scss" >
.bg-active {
  background-color: #4CAF50;
  color : white !important;
}
.cards-colors{
  background-color: rgb(48, 48, 48) !important;
}
.relatorios{
  background-color: rgb(30, 30, 30) !important;
}
</style>